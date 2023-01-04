import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

interface RestParkingButtonProps {
  checked: boolean
  onClick: React.ChangeEventHandler<HTMLInputElement>
}

function RestParkingButton({ checked, onClick }: RestParkingButtonProps) {
  const map = useMap()
  const text: string = checked ? '顯示所有停車場' : '顯示有空位的停車場'

  useEffect(() => {
    // create custom control label
    const Label = L.Control.extend({
      onAdd: function () {
        const label = L.DomUtil.create('label', 'leaflet-bar restParkingBtn')
        label.innerHTML = `${text}`
        label.setAttribute('for', 'restParkingBtn')
        return label
      },
    })
    const label = new Label()
    label.setPosition('topleft')
    label.addTo(map)

    return () => {
      label.remove()
    }
  }, [map, text])

  return (
    <input
      type="checkbox"
      id="restParkingBtn"
      style={{ display: 'none' }}
      checked={checked}
      onChange={onClick}
    />
  )
}
export default RestParkingButton
