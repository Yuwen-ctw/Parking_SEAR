import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import parkingIcon from './ParkingIcon'
import PopupContent from './HSCPopupContent'
import L from 'leaflet'
import { HSCDataType } from './DataTypes'

const iconColor = {
  green: 'green',
  yellow: 'gold',
  red: 'red',
}

interface ParkingMarkerProp {
  parking: HSCDataType
}

function HSCParkingMarker({ parking }: ParkingMarkerProp) {
  let color: string
  if (Number(parking.FREESPACE === 0)) {
    color = iconColor.red
  } else {
    color = Number(parking.FREESPACE >= 30) ? iconColor.green : iconColor.yellow
  }

  return (
    <Marker
      icon={parkingIcon(color)}
      key={parking.PARKNO}
      position={{
        lat: Number(parking.X_COORDINATE),
        lng: Number(parking.Y_COORDINATE),
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
        <PopupContent parking={parking} />
      </Popup>
    </Marker>
  )
}

export default React.memo(HSCParkingMarker)
