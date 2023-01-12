import L from 'leaflet'
import ReactDOM from 'react-dom'
import React, { useState, useEffect, useRef } from 'react'
import Lottie from 'lottie-react'
import { Marker, Popup, useMap } from 'react-leaflet'
import { Button } from 'react-bootstrap'
import placeIconAnimation from 'assets/animateIcon/placeIcon.json'

interface PlaceMarkerProp {
  placeResult: {
    placeName: string
    placeAddress: string
    placeLatLng: L.LatLngLiteral
  }
}

const PlaceIcon = () => (
  <Lottie animationData={placeIconAnimation} style={{ width: '65px' }} loop />
)

function PlaceMarker({ placeResult }: PlaceMarkerProp) {
  const map = useMap()
  const navigatePrefix = 'https://www.google.com.tw/maps/dir'
  const [portalRoot, setPortalRoot] = useState<Element | null>(null)
  const iconContainerRef = useRef<HTMLDivElement>(document.createElement('div'))

  useEffect(() => {
    // find divIcon element which in Marker component
    const targetDiv = document.querySelector('.placeIcon')
    // if found, inserts the iconContainer
    targetDiv && setPortalRoot(targetDiv)
    portalRoot && portalRoot.append(iconContainerRef.current)
  }, [placeResult?.placeLatLng, portalRoot])

  function handleDirectClick(distX: number, distY: number) {
    event?.preventDefault()
    if ('geolocation' in navigator) {
      map.locate({ enableHighAccuracy: true })
      map.once('locationfound', ({ latlng }) => {
        window.open(
          `${navigatePrefix}/${latlng.lat},${latlng.lng}/${distX},${distY}`,
          L.Browser.safari ? '_top' : '_blank'
        )
      })
      map.once('locationerror', () => alert('無法取得定位資訊'))
    } else {
      alert('Sorry, 你的裝置不支援地理位置功能。')
    }
  }

  if (!placeResult?.placeLatLng) return null
  return (
    <>
      {
        // the iconContainer received PlaceIcon by createPortal method
        ReactDOM.createPortal(<PlaceIcon />, iconContainerRef.current)
      }
      <Marker
        position={placeResult.placeLatLng}
        zIndexOffset={1000}
        icon={L.divIcon({
          html: ``,
          className: 'placeIcon',
          // iconAnchor attribute should fit the size of icon as possible
          iconAnchor: [33, 44],
        })}
      >
        <Popup
          // offset the position to the top of marker
          maxWidth={350}
          offset={[0, -30]}
          closeButton={false}
          // offset the pop from top
          autoPanPaddingTopLeft={L.point(0, 100)}
        >
          <div className="fs-6 fw-bolder text-center">
            <p className="fs-5 mb-0">{placeResult.placeName}</p>
            <p className="mb-0">{placeResult.placeAddress}</p>
            <Button
              variant="link"
              onClick={() =>
                handleDirectClick(
                  placeResult.placeLatLng.lat,
                  placeResult.placeLatLng.lng
                )
              }
            >
              開始導航
            </Button>
          </div>
        </Popup>
      </Marker>
    </>
  )
}

export default React.memo(PlaceMarker)
