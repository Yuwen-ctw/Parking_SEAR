import L from 'leaflet'
import { useState, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from 'react-google-places-autocomplete'
import Control from 'components/Map/Controls/lib/Control'
import { PlaceMarker } from 'components/Map/CustomMarkers'

function SearchPlaceBar({ position }: { position: L.ControlPosition }) {
  const map = useMap()
  const [disable, setDisable] = useState(false)
  const [placeResult, setPlaceResult] = useState({} as PlaceResult)
  const placeholder = disable
    ? '請切換圖層至 GoogleMap 再進行搜尋唷'
    : '關鍵字搜尋（至少 2 個字元）'

  useEffect(() => {
    function handleBaseLayerChange(e: L.LayersControlEvent): void {
      e.name !== 'GoogleMap' ? setDisable(true) : setDisable(false)
    }
    map.addEventListener('baselayerchange', handleBaseLayerChange)
    return () => {
      map.removeEventListener('baselayerchange', handleBaseLayerChange)
    }
  }, [])

  function handleSelectChange(result: PartOfAutoCompleteResult) {
    if (!result) return

    const temPlaceResult = {} as PlaceResult
    temPlaceResult.placeName = result.value.structured_formatting.main_text

    geocodeByPlaceId(result.value.place_id)
      .then((geocoderResult) => {
        temPlaceResult.placeAddress = geocoderResult[0].formatted_address
        return getLatLng(geocoderResult[0])
      })
      .then((latLng) => {
        temPlaceResult.placeLatLng = latLng
        setPlaceResult(temPlaceResult)
        map.flyTo(latLng, 16, { duration: 0.5 })
      })
      .catch((err) => console.log(err))
  }
  return (
    <>
      <Control
        position={position}
        containerKey="search-place-bar"
        prepend={false}
      >
        <div style={{ minWidth: '300px' }}>
          <GooglePlacesAutocomplete
            autocompletionRequest={{ componentRestrictions: { country: 'TW' } }}
            minLengthAutocomplete={2}
            selectProps={{
              value: '',
              isDisabled: disable,
              isClearable: true,
              placeholder,
              onChange: handleSelectChange,
              noOptionsMessage: () => '尚無結果',
            }}
          />
        </div>
      </Control>
      <PlaceMarker placeResult={placeResult} />
    </>
  )
}

export default SearchPlaceBar

interface PartOfAutoCompleteResult {
  label: string
  value: {
    structured_formatting: {
      main_text: string
    }
    description: string
    place_id: string
  }
}

interface PlaceResult {
  placeName: string
  placeAddress: string
  placeLatLng: L.LatLngLiteral
}
