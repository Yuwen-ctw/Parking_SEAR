import { useMap, CircleMarker } from 'react-leaflet'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import locationSvg from 'assets/location.svg'
import './LocationButton.scss'

function LocationButton() {
  const map = useMap()
  const [center, setCenter] = useState<L.LatLngExpression | null>(null)

  function handleGetLocation(): void {
    if ('geolocation' in navigator) {
      map.locate(getPositionOptions)
      map.on('locationfound', getLocationSuccess)
      map.on('locationerror', getLocationError)
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

  const getPositionOptions: L.LocateOptions = {
    setView: false,
    watch: false,
    enableHighAccuracy: true,
    timeout: 10000,
  }

  useEffect(() => {
    // create custom control button
    const Button = L.Control.extend({
      onAdd: function () {
        const button = L.DomUtil.create('button', 'leaflet-bar locationBtn')
        button.innerHTML = `<img src=${locationSvg} class='locationSvg'/>`
        button.addEventListener('click', handleGetLocation)
        return button
      },
      onRemove: function () {
        const button = document.querySelector('.locationBtn')
        if (button) button.removeEventListener('click', handleGetLocation)
      },
    })
    const button = new Button()
    button.setPosition('topleft')
    button.addTo(map)

    return () => {
      // stop watch location and remove button
      map.stopLocate()
      button.remove()
    }
  }, [map])

  return center ? <CircleMarker center={center} radius={5} /> : null
}

export default LocationButton
