import { Marker } from 'react-leaflet'
import { useState, useEffect, useRef } from 'react'
import Lottie from 'lottie-react'
import placeIconAnimation from 'assets/animateIcon/placeIcon.json'
import ReactDOM from 'react-dom'
import L from 'leaflet'

interface PlaceMarkerProp {
  placeLatLng: L.LatLngExpression | null
}

const PlaceIcon = () => (
  <Lottie animationData={placeIconAnimation} style={{ width: '50px' }} loop />
)

function PlaceMarker({ placeLatLng }: PlaceMarkerProp) {
  const [portalRoot, setPortalRoot] = useState<Element | null>(null)
  const iconContainerRef = useRef<HTMLDivElement>(document.createElement('div'))

  useEffect(() => {
    // find divIcon element which in Marker component
    const targetDiv = document.querySelector('.placeIcon')
    // if found, inserts the iconContainer
    targetDiv && setPortalRoot(targetDiv)
    portalRoot && portalRoot.append(iconContainerRef.current)
  }, [placeLatLng, portalRoot])

  if (!placeLatLng) return null
  return (
    <>
      {
        // the iconContainer received PlaceIcon by createPortal method
        ReactDOM.createPortal(<PlaceIcon />, iconContainerRef.current)
      }
      <Marker
        position={placeLatLng}
        zIndexOffset={1000}
        icon={L.divIcon({
          html: ``,
          className: 'placeIcon',
          // iconAnchor attribute should fit the size of icon as possible
          iconAnchor: [25, 27],
        })}
      />
    </>
  )
}

export default PlaceMarker
