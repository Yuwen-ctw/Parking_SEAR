import Map from 'components/Map/Map'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
