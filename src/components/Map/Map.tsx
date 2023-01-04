import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import LocationButton from './LocationButton'
import RestParkingButton from './RestParkingButton'
import parkingIcon from './ParkingIcon'
import getHsinChuParking from 'apis/hsinchuParking'

const iconColor = {
  green: '#198754',
  yellow: '#ffc107',
  red: '#dc3545',
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

  const parkingList = parkings.map((parking) => {
    let color: string
    if (Number(parking.FREESPACE === 0)) {
      color = iconColor.red
    } else {
      color = Number(parking.FREESPACE >= 30)
        ? iconColor.green
        : iconColor.yellow
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
        <Popup autoClose={false}>
          <>
            <p>剩餘車位: {parking.FREESPACE}</p>
          </>
        </Popup>
      </Marker>
    )
  })

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
        center={[24.809487, 120.974726]}
        zoom={13}
        className="container-fluid vh-100"
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {parkingList}
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
