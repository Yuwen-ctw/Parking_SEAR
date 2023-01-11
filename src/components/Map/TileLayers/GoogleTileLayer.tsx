import ReactLeafletGoogleLayer from 'react-leaflet-google-layer'

const initialSetting = {
  googleMapStyle: [
    {
      elementType: 'labels',
      stylers: [{ visibility: 'simplified' }],
    },
    { featureType: 'poi', stylers: [{ saturation: '-100' }] },
  ],
}

function GoogleTileLayer() {
  return (
    <ReactLeafletGoogleLayer
      useGoogMapsLoader={false}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore:next-line
      styles={initialSetting.googleMapStyle}
    />
  )
}

export default GoogleTileLayer
