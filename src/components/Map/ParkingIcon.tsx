import L from 'leaflet'

const parkingIcon = (color = '#237cc9') =>
  L.divIcon({
    html: `<svg fill="${color}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="35px" height="35px" viewBox="0 0 145 260" enable-background="new 0 0 145 260" xml:space="preserve" >
<path d="M72.5,2C33.56,2,2,33.56,2,72.5c0,9.77,2.027,21.524,5.58,30C23.98,141.617,72.5,258,72.5,258s48.52-116.258,64.92-155.375	C140.973,94.149,143,82.27,143,72.5C143,33.56,111.44,2,72.5,2z M72.5,105.05c-17.7,0-32.05-14.35-32.05-32.05
	S54.8,40.95,72.5,40.95S104.55,55.3,104.55,73S90.2,105.05,72.5,105.05z" stroke="#000" stroke-width="10 "/>
</svg>`,
    className: 'parkingIcon',
    // I think the iconAnchor attribute should fit the size of <path>
    iconAnchor: [18, 35],
  })

export default parkingIcon
