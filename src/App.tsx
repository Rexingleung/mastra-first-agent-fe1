import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import Test from './routes/test'

function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>

    </>
  )
}

export default App
