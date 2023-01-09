import Map from 'components/Map/Map'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter basename="Parking_Searching">
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
