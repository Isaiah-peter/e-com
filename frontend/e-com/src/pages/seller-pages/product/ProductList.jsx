import React from 'react'
import './style.css'

const ProductList = () => {
  return (
    <div>
      <h1>Products</h1>
      <hr />
      <div>
        <div class="d-grid flex-wrap mb-3">
          <div class="column">
            <div class="card">
              <div class="product">
                <div class="product-image">
                  <div class="product-item active">
                    <img src="https://images.unsplash.com/photo-1563535708875-ddec13a419b5" alt="product" class="img-fluid w-0" />
                  </div>
                </div>
                <div class="product-content p-3">
                  <a class="fw-bold" href='#'>Oculus VR </a>
                  <p class="text-muted">decs</p>
                  <span class="d-block fw-bold fs-5 text-secondary">$149</span>
                  <a class="btn btn-primary mt-3" href="#">Add to Cart</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList