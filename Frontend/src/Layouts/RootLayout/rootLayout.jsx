import React from 'react'
import './rootLayout.css'
import { Link, Outlet } from 'react-router-dom'

function rootLayout() {
  return (
    <div className='rootLayout'>
      <header>
        <Link to='/' className='logo'>
          <img src="./logo.png" alt="" />
          <span>Koowal AI</span>
        </Link>
        <div className="user">
          <img src="" alt="" />
          <span>User</span>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default rootLayout