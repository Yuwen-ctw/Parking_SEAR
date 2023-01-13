import { useState, useEffect } from 'react'
import { MapContainer, ZoomControl, LayersControl } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { getHsinchuParking } from 'apis/fetchParkingdata'
// components
import { OpenStreetTileLayer, GoogleTileLayer } from './TileLayers'
import { SearchPlaceBar, LocationButton, MarkerControl } from './Controls'
import { ParkingMarker } from './CustomMarkers'
import { Container, Spinner } from 'react-bootstrap'
import Swal from 'sweetalert2'

const initialSetting = {
  mapCenter: [24.809487, 120.974726] as L.LatLngExpression,
  mapZoom: 13 as number,
  maxZoom: 19 as number,
}

const LoadingSpinner = () => (
  <Container fluid className="spinner__container">
    <Spinner variant="primary" className="spinner__dataLoading" />
  </Container>
)

function Map() {
  const [loading, setLoading] = useState<boolean>(false)
  const [parkingData, setParkingData] = useState<Data[]>([])
  const [isFilterAvailable, setIsFilterAvailable] = useState<boolean>(false)
  const [isCluster, setIsCluster] = useState<boolean>(true)
  const [canUpdateData, setCanUpdateData] = useState<boolean>(true)

  useEffect(() => {
    async function getData() {
      setLoading(true)
      const data = (await getHsinchuParking()) as Data[]
      setParkingData(data)
      toast('顯示所有停車場')
      setLoading(false)
    }
    getData()
  }, [])

  const parkingList = parkingData.map((parking) => (
    <ParkingMarker key={parking.PARKNO} parking={parking} />
  ))

  async function handleToggleFilter() {
    if (isFilterAvailable) {
      // refetch data
      const data = (await getHsinchuParking()) as Data[]
      setParkingData(data)
    } else {
      // filter data
      const filterDataList = parkingData.filter(
        (parking) => Number(parking.FREESPACE) > 0
      )
      setParkingData(filterDataList)
    }
    // toggle state
    setIsFilterAvailable(!isFilterAvailable)
    toast(isFilterAvailable ? '顯示所有停車場' : '隱藏滿位停車場')
  }

  function handleToggleClusterBtn() {
    setIsCluster(!isCluster)
    toast(isCluster ? '展開標記' : '群組標記')
  }

  async function handleClickUpdateData() {
    setCanUpdateData(!canUpdateData)
    setLoading(true)
    const data = (await getHsinchuParking()) as Data[]
    setParkingData(data)
    setLoading(false)
    setTimeout(() => setCanUpdateData(true), 2000)
  }
  return (
    <section>
      {loading && <LoadingSpinner />}
      <MapContainer
        center={initialSetting.mapCenter}
        zoom={initialSetting.mapZoom}
        className="vh-100"
        zoomControl={false}
        maxZoom={initialSetting.maxZoom}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="GoogleMap" checked>
            <GoogleTileLayer />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap">
            <OpenStreetTileLayer />
          </LayersControl.BaseLayer>
        </LayersControl>
        <MarkerClusterGroup
          key={isCluster}
          maxClusterRadius={isCluster ? 50 : 0}
          spiderfyOnMaxZoom={false}
          disableClusteringAtZoom={17}
          chunkedLoading
        >
          {parkingList}
        </MarkerClusterGroup>
        <SearchPlaceBar position="topleft" />
        <ZoomControl position="bottomright" />
        <LocationButton position="bottomright" />
        <MarkerControl
          position="bottomright"
          isFilterChecked={isFilterAvailable}
          isClusterChecked={isCluster}
          canUpdateData={canUpdateData}
          onToggleFilter={handleToggleFilter}
          onToggleCluster={handleToggleClusterBtn}
          onUpdateClick={handleClickUpdateData}
        />
      </MapContainer>
    </section>
  )
}

export default Map

function toast(message: string) {
  Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1800,
    width: 200,
    padding: 0,
    html: `<p class='text-center p-0 m-0' >${message}</p>`,
  }).fire()
}

type Data = {
  PARKNO: string
  PARKINGNAME: string
  ADDRESS: string
  BUSINESSHOURS: string
  WEEKDAYS: string
  HOLIDAY: string
  FREESPACEBIG: number
  TOTALSPACEBIG: number
  FREESPACE: number
  TOTALSPACE: number
  FREESPACEMOT: number
  TOTALSPACEMOT: number
  FREESPACEDIS: number
  TOTALSPACEDIS: number
  FREESPACECW: number
  TOTALSPACECW: number
  FREESPACEECAR: number
  TOTALSPACEECAR: number
  X_COORDINATE: string
  Y_COORDINATE: string
  UPDATETIME: string
}
