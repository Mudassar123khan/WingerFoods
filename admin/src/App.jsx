import React from 'react'
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/Sidebar/SideBar'
import {Route, Routes} from 'react-router-dom'
import Add from './pages/Add/Add'
import './index.css'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'
function App() {
  return (
    <div>
      <NavBar/>
      <hr />
      <div className="app-content">
        <SideBar/>
        <Routes>
          <Route path="/add" element={<Add/>}/>
          <Route path='/list' element={<List/>}/>
          <Route path='/orders' element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
