import { useState, useEffect, useCallback } from 'react'
import { MapContainer, ZoomControl, LayersControl } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import { getHSCParking, getTPEParking } from 'apis/fetchParkingdata'
// components
import { OpenStreetTileLayer, GoogleTileLayer } from './TileLayers'
import { SearchPlaceBar, LocationButton, MarkerControl } from './Controls'
import {
  HSCParkingMarker,
  TPEParkingMarker,
  HSCDataType,
  TPEDataType,
} from './CustomMarkers'
import { Container, Spinner } from 'react-bootstrap'
import Swal from 'sweetalert2'

const initialSetting = {
  mapCenter: [24.809487, 120.974726] as L.LatLngExpression,
  mapZoom: 10 as number,
  maxZoom: 19 as number,
}

const LoadingSpinner = () => (
  <Container fluid className="spinner__container">
    <Spinner variant="primary" className="spinner__dataLoading" />
  </Container>
)

const navigatePrefix = 'https://www.google.com.tw/maps/dir'

function Map() {
  const [loading, setLoading] = useState<boolean>(false)
  const [HSCData, setHSCData] = useState<HSCDataType[]>([])
  const [TPEData, setTPEData] = useState<TPEDataType[]>([])
  const [isFiltered, setIsFiltered] = useState<boolean>(true)
  const [isClustered, setIsClustered] = useState<boolean>(true)
  const [canUpdateData, setCanUpdateData] = useState<boolean>(true)

  const getDataAndFilter = useCallback(async () => {
    setLoading(true)
    const HSCDataPromise = getHSCParking()
    const TPEDataPromise = getTPEParking()
    const results = await Promise.all([HSCDataPromise, TPEDataPromise])
    const filterHSCData = results[0].filter(
      (parking: any) => Number(parking.FREESPACE) > 0
    )
    const filterTPEData = results[1].filter(
      (parking: any) => Number(parking.availablecar) > 0
    )
    setHSCData(filterHSCData)
    setTPEData(filterTPEData)
    setLoading(false)
    toast('僅顯示有空位的停車場')
  }, [])
  // fetch data
  useEffect(() => {
    getDataAndFilter()
  }, [])

  // subscribe click eventListener on popup pane
  useEffect(() => {
    const popupPane = document.querySelector('.leaflet-popup-pane')
    popupPane?.addEventListener('click', handleClickDirection)

    function handleClickDirection(e: any) {
      if (e?.target.tagName !== 'BUTTON') return
      // get destination lat and lng from HTML dataset
      const destinationCoords = e.target.closest('.container').dataset.coords
      if (!destinationCoords) return

      // get current position by geolocation api
      const positionSuccess = (result: GeolocationPosition) => {
        const coords = result.coords
        window.open(
          `${navigatePrefix}/${coords.latitude},${coords.longitude}/${destinationCoords}`,
          L.Browser.safari ? '_top' : '_blank'
        )
      }
      const positionError = () => alert('無法取得定位資訊')
      const positionOptions: PositionOptions = { enableHighAccuracy: true }

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          positionSuccess,
          positionError,
          positionOptions
        )
      } else {
        alert('Sorry, 你的裝置不支援地理位置功能。')
      }
    }
    return () => popupPane?.removeEventListener('click', print)
  }, [])

  // map data
  const parkingList = HSCData.map((parking) => (
    <HSCParkingMarker key={parking.PARKNO} parking={parking} />
  ))

  const TPEParkingList = TPEData.map((parking) => (
    <TPEParkingMarker key={parking.id} parking={parking} />
  ))

  // event handlers
  async function handleToggleFilter() {
    if (isFiltered) {
      // alert
      Swal.fire({
        title: '顯示所有停車場會降低效能，確定執行嗎?',
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then(async (result) => {
        if (!result.isConfirmed) return
        // refetch data
        setLoading(true)
        const HSCDataPromise = getHSCParking()
        const TPEDataPromise = getTPEParking()
        await Promise.all([
          HSCDataPromise.then((result) => setHSCData(result)),
          TPEDataPromise.then((result) => setTPEData(result)),
        ])
        setLoading(false)
        // toggle state
        setIsFiltered(!isFiltered)
        toast('顯示所有停車場')
      })
    } else {
      // filter data
      const filterHSCData = HSCData.filter(
        (parking) => Number(parking.FREESPACE) > 0
      )
      setHSCData(filterHSCData)
      const filterTPEData = TPEData.filter(
        (parking) => Number(parking.availablecar) > 0
      )
      setTPEData(filterTPEData)
      // toggle state
      setIsFiltered(!isFiltered)
      toast('僅顯示有空位的停車場')
    }
  }

  function handleToggleClusterBtn() {
    if (isClustered) {
      // alert
      Swal.fire({
        title: '將標記展開會降低效能，確定執行嗎?',
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (!result.isConfirmed) return
        // cluster marker
        setIsClustered(!isClustered)
        toast(isClustered ? '展開標記' : '群組標記')
      })
    } else {
      setIsClustered(!isClustered)
      toast(isClustered ? '展開標記' : '群組標記')
    }
  }

  async function handleClickUpdateData() {
    setCanUpdateData(!canUpdateData)
    getDataAndFilter()
    setIsFiltered(true)
    // debounce 2s
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
          key={isClustered}
          maxClusterRadius={isClustered ? 80 : 0}
          spiderfyOnMaxZoom={false}
          disableClusteringAtZoom={17}
          chunkedLoading
        >
          {TPEParkingList}
          {parkingList}
        </MarkerClusterGroup>
        <SearchPlaceBar position="topleft" />
        <ZoomControl position="bottomright" />
        <LocationButton position="bottomright" />
        <MarkerControl
          position="bottomright"
          isFilterChecked={isFiltered}
          isClusterChecked={isClustered}
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
    timer: 2800,
    width: 220,
    padding: 0,
    html: `<p class='text-center p-0 m-0' >${message}</p>`,
  }).fire()
}
