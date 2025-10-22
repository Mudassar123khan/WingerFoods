import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
function AppDownload() {
  return (
    <div className='app-download' id='app-download'>
      <p>For better exprience Download <br /> WingerFoods app</p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="playstore" />
        <img src={assets.app_store} alt="appstore" />
      </div>
    </div>
  )
}

export default AppDownload
