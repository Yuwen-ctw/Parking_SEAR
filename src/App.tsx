import Map from 'components/Map/Map'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter basename="parking_finder">
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
