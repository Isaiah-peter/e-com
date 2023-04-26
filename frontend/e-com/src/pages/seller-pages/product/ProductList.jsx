import React, { useEffect, useState } from 'react'
import {useSelector } from "react-redux";
import './style.css'
import axios from 'axios';

const ProductList = () => {
  const { user, auth_token } = useSelector((state) => state.user.currentUser);
  const [products, setProducts] = useState([])

  console.log(user)
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`http://Localhost:5000/products/${user.id}`, {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        });
        setProducts(res.data.Product);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [])


  return (
    <div>
      <h1>Products</h1>
      <hr />
      <div>
        {
          products.length == 0 ? (

            <div className='d-flex align-items-center justify-content-center h-100'>
              <h1 style={{color: "#ccc"}}>
                No product
              </h1>
            </div>
          ) : (
            <div class="d-grid flex-wrap mb-3">
              {
                products.map((i) => (
                  <div class="column" key={i.id} >
                    <div class="card">
                      <div class="product">
                        <div class="product-image">
                          <div class="product-item active">
                            <img src={i.url} alt="product" class="img-fluid w-0" />
                          </div>
                        </div>
                        <div class="product-content p-3">
                          <a class="fw-bold" href='#'>{i.name}</a>
                          <p class="text-muted">{i.description}</p>
                          <span class="d-block fw-bold fs-5 text-secondary">${i.price}</span>
                          <a class="btn btn-primary mt-3" href="#">Add to Cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ProductList