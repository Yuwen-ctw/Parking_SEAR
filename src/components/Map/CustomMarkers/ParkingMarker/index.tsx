import { Marker, Popup } from 'react-leaflet'
import parkingIcon from './ParkingIcon'
import PopupContent from './PopupContent'

const iconColor = {
  green: '#198754',
  yellow: '#ffc107',
  red: '#dc3545',
}

interface ParkingMarkerProp {
  parking: Data
}

function ParkingMarker({ parking }: ParkingMarkerProp) {
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
      {/* offset the position to the top of marker*/}
      <Popup offset={[0, -25]} minWidth={280} closeButton={false}>
        <PopupContent parking={parking} />
      </Popup>
    </Marker>
  )
}

export default ParkingMarker

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
