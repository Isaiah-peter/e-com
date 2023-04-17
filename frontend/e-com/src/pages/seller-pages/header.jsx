import React from 'react'
import "./header.css"
import user_imge from "../../asset/user.svg"

const Header = () => {
  return (
    <div className='header'>
      <nav class="navbar py-4">
        <div class="container-xxl w-100 d-flex align-item-center justify-content-between">
          <div class="h-right d-flex align-items-center mr-5 mr-lg-0 order-1">
            <div class="d-flex mx-2 mt-1">
              <a class="nav-link text-primary collapsed" title="Get Help" href="/template/ebazar/react/help">
                <i class="icofont-info-square fs-5"></i>
              </a>
            </div>
            <div class=" dropdown user-profilem ml-2 ml-sm-3 d-flex align-items-center zindex-popover dropdown">
              <div class="u-info me-2">
                <p class="mb-0 text-end line-height-sm ">
                  <span class="font-weight-bold">John Quinn</span>
                </p>
                <small>Seller Profile</small>
              </div>
              <a class="nav-link pulse p-0 mb-3" id="react-aria1271382322-3" aria-expanded="false" href="#!" role="button">
                <img class="avatar lg rounded-circle img-thumbnail" src={user_imge} alt="profile" />
              </a>
            </div>
            <div class="setting ms-2">
              <a href="#!">
                <i class="icofont-gear-alt fs-5"></i>
              </a>
            </div>
          </div>
          <div class="order-0 col-lg-4 col-md-4 col-sm-12 col-12 mb-4  ">
            <div class="input-group flex-nowrap input-group-lg">
              <input type="search" class="form-control" placeholder="Search" />
              <button type="button" class="input-group-text" id="addon-wrapping">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </nav >
    </div>
  )
}

export default Header