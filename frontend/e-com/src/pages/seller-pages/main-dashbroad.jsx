import React from 'react'
import SideBar from './SideBar'
import Dashboard from './dashboard'
import Header from './header'

const MainDashBroad = () => {
    return (
      <div className='d-flex bg-light-blue'>
        <SideBar />
        <div className="w-100 h-100vh">
          <Header />
          <div className="px-lg-4 px-md-4 w-100">
            <Dashboard />
          </div>
        </div>
      </div>
  )
}

export default MainDashBroad