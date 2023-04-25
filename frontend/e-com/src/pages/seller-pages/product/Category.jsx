import React from 'react'

const Category = () => {
  return (
    <div>
      <h1>Categories</h1>
      <hr />
      <div className="card white-background">
        <div className="p-4">
          <div className="d-flex align-items-center gap-2 table_header table_header--color border-bottom">
            <li className="column-1">S/N</li>
            <li className="column-1">Customer Name</li>
          </div>
          <div className="table-body text-sm pt-3">
            <div className="d-flex align-items-center gap-2 table_header pt-3 pb-3">
              <li className="column-1">1</li>
              <li className="column-1">Isaiah</li>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category