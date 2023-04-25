import React from 'react'
import SideBar from './SideBar'
import Header from './header'

const MainDashBroad = (props) => {
    return (
      <div className='d-flex bg-light-blue'>
        <SideBar />
        <div className="w-100 h-100vh">
          <Header />
          <div className="px-lg-4 px-md-4 w-100">
            {props.children}
          </div>
        </div>
      </div>
  )
}

export default MainDashBroad