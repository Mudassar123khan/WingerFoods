import React from 'react'
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/Sidebar/SideBar'
import {Route, Routes} from 'react-router-dom'
import Add from './pages/Add/Add'
import './index.css'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const url = 'http://localhost:4000'

  return (
    <div>
      <ToastContainer/>
      <NavBar/>
      <hr />
      <div className="app-content">
        <SideBar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/orders' element={<Orders url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
