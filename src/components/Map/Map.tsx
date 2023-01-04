import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import styles from './Map.module.scss'
import data from 'data/hcParkInfo.json'

function Map() {
  const filterDataList = data.filter((parking) => Number(parking.FREESPACE) > 0)

  const dataList = filterDataList.map((parking) => (
    <Marker
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
  ))
  return (
    <MapContainer
      center={[24.809487, 120.974726]}
      zoom={13}
      className={styles.map}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={18}
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {dataList}
    </MapContainer>
  )
}

export default Map
