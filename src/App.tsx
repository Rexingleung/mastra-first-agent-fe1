import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import ChatItem from './routes/ChatItem'

function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatItem />} />
      </Routes>

    </>
  )
}

export default App
