import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Header from './components/Header'
import Login from './components/Login'
import {Routes, Route} from 'react-router-dom'
import Landing from './components/Landing'
import {RecoilRoot} from 'recoil'
import {useLocation} from 'react-router-dom'
import Dashboard from './components/Dashboard'

function App() {
	const location = useLocation()

	const bg = location.pathname.includes('/dashboard') ? 'bg-black' : 'bg-[#121212]'
  
  return (
  	<RecoilRoot>
    <div className={`${bg} min-h-screen`}>
      <Header />
      <Routes>
      	<Route path="/login" element={<Login />} />
      	<Route path="/" element={<Landing />} />
      	<Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
    </RecoilRoot>
  )
}

export default App
