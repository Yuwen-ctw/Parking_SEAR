import { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer'
import SearchPlaceBar from './SearchPlaceBar'
import LocationButton from './LocationButton'
import RestParkingButton from './RestParkingButton'
import ParkingMarker from './CustomMarkers/ParkingMarker'
import MarkerClusterGroup from 'react-leaflet-cluster'
import getHsinChuParking from 'apis/hsinchuParking'

const initialSetting = {
  mapCenter: [24.809487, 120.974726] as L.LatLngExpression,
  mapZoom: 13 as number,
  tileLayerUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png' as string,
  tileLayerAttribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' as string,
  tileLayerMaxZoom: 18 as number,
}

function Map() {
  const [parkings, setParkings] = useState<Data[]>([])
  const [showRestParkingLayer, setShowRestParkingLayer] = useState(false)

  useEffect(() => {
    async function getData() {
      const data = (await getHsinChuParking()) as Data[]
      setParkings(data)
    }
    getData()
  }, [])

  const parkingList = parkings.map((parking) => (
    <ParkingMarker key={parking.PARKNO} parking={parking} />
  ))

  async function showshowRestParkingLayer() {
    if (showRestParkingLayer) {
      const data = (await getHsinChuParking()) as Data[]
      setParkings(data)
    } else {
      const filterDataList = parkings.filter(
        (parking) => Number(parking.FREESPACE) > 0
      )
      setParkings(filterDataList)
    }
    setShowRestParkingLayer(!showRestParkingLayer)
  }

  return (
    <>
      <MapContainer
        center={initialSetting.mapCenter}
        zoom={initialSetting.mapZoom}
        className="container-fluid vh-100"
      >
        <TileLayer
          url={initialSetting.tileLayerUrl}
          maxZoom={initialSetting.tileLayerMaxZoom}
          attribution={initialSetting.tileLayerAttribution}
        />
        <ReactLeafletGoogleLayer
          useGoogMapsLoader={false}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore:next-line
          maxZoom={initialSetting.tileLayerMaxZoom}
          styles={[
            { elementType: 'labels', stylers: [{ visibility: 'simplified' }] },
            { featureType: 'poi', stylers: [{ saturation: '-100' }] },
          ]}
        />
        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={50}
          showCoverageOnHover={true}
          spiderfyOnMaxZoom={14}
          disableClusteringAtZoom={16}
        >
          {parkingList}
        </MarkerClusterGroup>
        <SearchPlaceBar />
        <LocationButton />
        <RestParkingButton
          checked={showRestParkingLayer}
          onClick={showshowRestParkingLayer}
        />
      </MapContainer>
    </>
  )
}

export default Map

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
