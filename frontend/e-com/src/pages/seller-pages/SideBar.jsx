import React from 'react'
import "./sidebar.css"
import {Link, Redirect} from "react-router-dom"

const SideBar = () => {

  const handleRedirect = () => {
    window.location.href = '/'
  }
  return (
    <div className='sidebar px-4 py-4 py-md-4 me-0' style={{overflow: 'scroll'}}>
      <div className="d-flex flex-column h-100">
        <ul className="menu-list flex-grow-1 mt-3">
          <li className=" collapsed">
            <Link className="m-link " to="/dashboard">
              <i className="icofont-home fs-5"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className=" collapsed">
            <Link className="m-link " to="/dashboard/products">
              <i className="icofont-truck-loaded fs-5"></i>
              <span>Products</span>
            </Link>
          </li>
          <li className=" collapsed">
            <Link className="m-link" to="/dashboard/createproduct">
              <i className="icofont-ui-add fs-5"></i>
              <span>Create Products</span>
            </Link>
          </li>

          <li className=" collapsed">
            <Link className="m-link " to="/dashboard/categories">
              <i className="icofont-chart-flow fs-5"></i>
              <span>Category</span>
            </Link>
          </li>

          <li className=" collapsed">
            <Link className="m-link " to="/dashboard/orders">
              <i className="icofont-notepad fs-5"></i>
              <span>Order</span>
            </Link>
          </li>
        </ul>
        <button type="button" className="btn btn-link sidebar-mini-btn text-light" onClick={handleRedirect}>
          <span className="ms-2">
            <i className="icofont-bubble-right"></i>
          </span>
        </button>
      </div>
    </div>
  )
}

export default SideBar