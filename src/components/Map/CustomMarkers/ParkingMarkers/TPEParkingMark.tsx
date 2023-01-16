import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import TPEPopupContent from './TPEPopupContent'
import parkingIcon from './ParkingIcon'
import { TPEDataType } from './DataTypes'
import L from 'leaflet'
const iconColor = {
  green: 'green',
  yellow: 'gold',
  red: 'red',
  black: 'black',
}

interface ParkingMarkerProp {
  parking: TPEDataType
}

function TPEParkingMarker({ parking }: ParkingMarkerProp) {
  let color: string
  if (!parking?.availablecar || parking.availablecar < 0) {
    color = iconColor.black
  } else if (parking.availablecar === 0) {
    color = iconColor.red
  } else {
    color = parking.availablecar >= 30 ? iconColor.green : iconColor.yellow
  }

  return (
    <Marker
      icon={parkingIcon(color)}
      key={parking.id}
      position={{
        lat: Number(parking.lat),
        lng: Number(parking.lng),
      }}
    >
      <Popup
        // offset the position to the top of marker
        offset={[0, -25]}
        minWidth={300}
        closeButton={false}
        // offset the pop from top
        autoPanPaddingTopLeft={L.point(0, 100)}
      >
        <TPEPopupContent parking={parking} />
      </Popup>
    </Marker>
  )
}

export default React.memo(TPEParkingMarker)
