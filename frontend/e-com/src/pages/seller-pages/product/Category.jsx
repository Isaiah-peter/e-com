import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useSelector } from "react-redux";

const Category = () => {

  const { user, auth_token } = useSelector((state) => state.user.currentUser);
  const [category, setCategory] = useState([])

  console.log(user.id)
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/category`, {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        });
        setCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [])

  console.log(category)
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
            {
              category.map(i => (
                <div className="d-flex align-items-center gap-2 table_header pt-3 pb-3" key={i.id}>
                  <li className="column-1">{i.id}</li>
                  <li className="column-1">{i.name}</li>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category