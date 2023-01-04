import { MapContainer, TileLayer } from 'react-leaflet'
import styles from './Map.module.scss'

function Map() {
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
    </MapContainer>
  )
}

export default Map
