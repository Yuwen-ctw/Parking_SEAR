import { TileLayer } from 'react-leaflet'

const initialSetting = {
  tileLayerUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png' as string,
  tileLayerAttribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' as string,
}

function OpenStreetTileLayer() {
  return (
    <TileLayer
      url={initialSetting.tileLayerUrl}
      attribution={initialSetting.tileLayerAttribution}
    />
  )
}

export default OpenStreetTileLayer
