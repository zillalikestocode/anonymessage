import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Header from './components/Header'
import Login from './components/Login'
import {Routes, Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Routes>
      	<Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
