import Map from 'components/Map/Map'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  const baseName = import.meta.env.VITE_BASENAME
  return (
    <BrowserRouter basename={baseName}>
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
