import React from 'react'
import './style.css'

const Dashboard = () => {
  return (
    <div className="d-flex py-3 flex-column">
      <div className='fade tab-pane fade show tab-pane active show'>
        <div className="row g-3 mb-4 row-deck">
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                <div className="left-info">
                  <span className="text-muted">Customers</span>
                  <div>
                    <span className="fs-6 fw-bold me-2">54,208</span>
                  </div>
                </div>
                <div className="right-icon">
                  <i className="icofont-student-alt fs-3 color-light-orange"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                <div className="left-info">
                  <span className="text-muted">Order</span>
                  <div>
                    <span className="fs-6 fw-bold me-2">12314</span>
                  </div>
                </div>
                <div className="right-icon">
                  <i className="icofont-shopping-cart fs-3 color-lavender-purple">
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                <div className="left-info">
                  <span className="text-muted">Avg Sale</span>
                  <div>
                    <span className="fs-6 fw-bold me-2">$11770</span>
                  </div>
                </div>
                <div className="right-icon">
                  <i className="icofont-sale-discount fs-3 color-santa-fe"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                <div className="left-info">
                  <span className="text-muted">Avg Item Sale</span>
                  <div>
                    <span className="fs-6 fw-bold me-2">1185</span>
                  </div>
                </div>
                <div className="right-icon">
                  <i className="icofont-calculator-alt-2 fs-3 color-danger">
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm- mb-4">
            <div className="card">
              <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                <div className="left-info">
                  <span className="text-muted">Total Sale</span>
                  <div>
                    <span className="fs-6 fw-bold me-2">$135000</span>
                  </div>
                </div>
                <div className="right-icon">
                  <i className="icofont-calculator-alt-1 fs-3 color-lightblue"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                <div className="left-info">
                  <span className="text-muted">Visitors</span>
                  <div>
                    <span className="fs-6 fw-bold me-2">111452</span>
                  </div>
                </div>
                <div className="right-icon">
                  <i className="icofont-users-social fs-3 color-light-success"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                <div className="left-info">
                  <span className="text-muted">Total Products</span>
                  <div>
                    <span className="fs-6 fw-bold me-2">194511</span>
                  </div>
                </div>
                <div className="right-icon">
                  <i className="icofont-bag fs-3 color-light-orange"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                <div className="left-info">
                  <span className="text-muted">Top Selling Item</span>
                  <div>
                    <span className="fs-6 fw-bold me-2">1122</span>
                  </div>
                </div>
                <div className="right-icon">
                  <i className="icofont-star fs-3 color-lightyellow"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                <div className="left-info">
                  <span className="text-muted">Dealership</span>
                  <div>
                    <span className="fs-6 fw-bold me-2">132</span>
                  </div>
                </div>
                <div className="right-icon">
                  <i className="icofont-handshake-deal fs-3 color-lavender-purple">
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card white-background">
        <div className="card-header py-3 d-flex justify-content-between align-items-center bg-transparent border-bottom-0">
          <h6 class="m-0 fw-bold">Recent Transactions</h6>
        </div>

        <div className="p-4">
          <div className="d-flex align-items-center gap-2 table_header table_header--color border-bottom">
            <li className="column-1">Id</li>
            <li className="column-2">Item</li>
            <li className="column-1">Customer Name</li>
            <li className="column-1">Payment Info</li>
            <li className="column-1">Price</li>
            <li className="column-1">Status</li>
          </div>

          <div className="table-body text-sm pt-3">
            <div className="d-flex align-items-center gap-2 table_header pt-3 pb-3">
              <li className="column-1">#Order-11414</li>
              <li className="column-2 d-flex align-items-center">
                <img src="https://res.cloudinary.com/dieusg1qo/image/upload/v1681480253/cld-sample-5.jpg" alt="ima" className='img-fluid image-width rounded lg' />
                <h4 className='p-2'>Nike shoe</h4>
              </li>
              <li className="column-1">Isaiah</li>
              <li className="column-1">bank</li>
              <li className="column-1">$240</li>
              <li className="column-1 center-column rounded approve reject">pending</li>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard