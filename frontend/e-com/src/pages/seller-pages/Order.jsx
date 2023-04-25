import React from 'react'

const Order = () => {
  return (
    <div>
      <h1>Orders</h1>
      <hr />
      <div className="card white-background">
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

export default Order