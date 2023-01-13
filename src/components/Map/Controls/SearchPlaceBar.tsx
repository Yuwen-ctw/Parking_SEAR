import L from 'leaflet'
import { useState, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from 'react-google-places-autocomplete'
import Control from 'components/Map/Controls/base/Control'
import { PlaceMarker } from 'components/Map/CustomMarkers'
import { ReactComponent as SearchIcon } from 'assets/search.svg'
import useOnclickOutside from 'react-cool-onclickoutside'

function SearchPlaceBar({ position }: { position: L.ControlPosition }) {
  const map = useMap()
  const [extend, setExtend] = useState<boolean>(false)
  const [disable, setDisable] = useState<boolean>(false)
  const [placeResult, setPlaceResult] = useState({} as PlaceResult)
  const outSideRef = useOnclickOutside(() => setExtend(false))
  const placeholder = disable
    ? '請切換圖層至 GoogleMap 再進行搜尋唷'
    : '關鍵字搜尋（至少 2 個字元）'

  useEffect(() => {
    function handleBaseLayerChange(layerEvent: L.LayersControlEvent): void {
      layerEvent.name !== 'GoogleMap' ? setDisable(true) : setDisable(false)
    }
    map.addEventListener('baselayerchange', handleBaseLayerChange)
    return () => {
      map.removeEventListener('baselayerchange', handleBaseLayerChange)
    }
  }, [])

  function handleSelectChange(result: PartOfAutoCompleteResult) {
    if (!result) return
    const temPlaceResult = {} as PlaceResult
    // get result name
    temPlaceResult.placeName = result.value.structured_formatting.main_text

    geocodeByPlaceId(result.value.place_id)
      .then((geocoderResult) => {
        // get result address
        temPlaceResult.placeAddress = geocoderResult[0].formatted_address
        return getLatLng(geocoderResult[0])
      })
      .then((latLng) => {
        // get result latlng
        temPlaceResult.placeLatLng = latLng
        setPlaceResult(temPlaceResult)
        map.flyTo(latLng, 16, { duration: 0.5 })
      })
      .catch((err) => console.log(err))
    setExtend(false)
  }
  return (
    <>
      <Control
        position={position}
        containerKey="search-place-bar"
        prepend={false}
      >
        <div style={{ minWidth: '270px', position: 'relative' }}>
          <input
            type="checkbox"
            id="search-bar-expend-controller"
            className="d-none"
            checked={extend}
            onChange={() => setExtend(!extend)}
          />
          <label
            htmlFor="search-bar-expend-controller"
            className={`leaflet-bar text-center p-0 position-absolute ${
              extend && 'd-none'
            }`}
            style={{
              background: 'rgba(255,255,255,0.7)',
              zIndex: '1',
            }}
          >
            <SearchIcon width="30px" height="30px" className="p-1" />
          </label>

          {extend && (
            <div className="slide-in" ref={outSideRef}>
              <GooglePlacesAutocomplete
                autocompletionRequest={{
                  componentRestrictions: { country: 'TW' },
                }}
                minLengthAutocomplete={2}
                selectProps={{
                  autoFocus: true,
                  value: '',
                  isDisabled: disable,
                  isClearable: true,
                  placeholder,
                  onChange: handleSelectChange,
                  noOptionsMessage: () => '尚無結果',
                }}
              />
            </div>
          )}
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
