import { useMap, CircleMarker } from 'react-leaflet'
import { useState } from 'react'
import L from 'leaflet'
import { ReactComponent as LocationSvg } from 'assets/location.svg'
import Control from 'components/Map/Controls/lib/Control'

function LocationButton({ position }: { position: L.ControlPosition }) {
  const map = useMap()
  const [center, setCenter] = useState<L.LatLngExpression | null>(null)

  function handleGetLocation(): void {
    if ('geolocation' in navigator) {
      map.locate(getLocationOptions)
      map.once('locationfound', getLocationSuccess)
      map.once('locationerror', getLocationError)
    } else {
      alert('Sorry, 你的裝置不支援地理位置功能。')
    }
  }

  function getLocationSuccess(result: L.LocationEvent): void {
    console.log(result.accuracy)
    setCenter(result.latlng)
    map.flyTo(result.latlng, undefined, { duration: 0.5 })
  }

  function getLocationError(error: L.ErrorEvent): void {
    switch (error.code) {
      case 1:
        alert('請允許應用程式取得您的定位')
        break
      case 2:
        alert('網路連線不穩，無法取得定位資訊')
        break
      default:
        alert(error)
        return
    }
  }

  const getLocationOptions: L.LocateOptions = {
    setView: false,
    watch: false,
    enableHighAccuracy: true,
    timeout: 10000,
  }

  return (
    <>
      <Control position={position} containerKey="location" prepend>
        <button
          onClick={handleGetLocation}
          className="leaflet-bar text-center p-0"
        >
          <LocationSvg width="30px" height="30px" />
        </button>
      </Control>
      {center ? <CircleMarker center={center} radius={10} /> : null}
    </>
  )
}

export default LocationButton
