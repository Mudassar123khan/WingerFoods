import React from 'react'
import './NavBar.css'
import {assets} from "../../assets/assets"
function NavBar() {
  return (
    <div className='navbar'> 
      <img src={assets.logo} alt="logo" className='logo'/>
      <img src={assets.profile_image} alt="profile image" className='profile'/>
    </div>
  )
}

export default NavBar
