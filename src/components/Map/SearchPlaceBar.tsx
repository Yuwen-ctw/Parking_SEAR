import L from 'leaflet'
import { useState } from 'react'
import { useMap } from 'react-leaflet'
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from 'react-google-places-autocomplete'
import Control from 'lib/Control'
import PlaceMarker from './CustomMarkers/PlaceMarker'

function SearchPlaceBar({ position }: { position: L.ControlPosition }) {
  const map = useMap()

  const [placeLatLng, setPlaceLatLng] = useState<L.LatLngExpression | null>(
    null
  )

  function handleSelectChange(result: PartOfAutoCompleteResult) {
    if (!result) return
    geocodeByPlaceId(result.value.place_id)
      .then((geocoderResult) => getLatLng(geocoderResult[0]))
      .then((latLng) => {
        setPlaceLatLng(latLng)
        map.flyTo(latLng, 16, { duration: 0.5 })
      })
      .catch((err) => console.log(err))
  }
  return (
    <>
      <Control position={position} containerKey="search-place-bar">
        <div style={{ minWidth: '300px' }}>
          <GooglePlacesAutocomplete
            autocompletionRequest={{ componentRestrictions: { country: 'TW' } }}
            minLengthAutocomplete={2}
            selectProps={{
              isClearable: true,
              placeholder: '關鍵字搜尋（至少 2 個字元）',
              onChange: handleSelectChange,
              noOptionsMessage: () => '尚無結果',
            }}
          />
        </div>
      </Control>
      <PlaceMarker placeLatLng={placeLatLng} />
    </>
  )
}

export default SearchPlaceBar

interface PartOfAutoCompleteResult {
  label: string
  value: {
    description: string
    place_id: string
  }
}
