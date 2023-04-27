import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import { popularProduct } from "../data"
import axios from "axios"
import { useSelector } from "react-redux";
const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`

const H1 = styled.h1`
  font-size: 30px;
  text-align: center;
`

const Product = ({cat, filter, sort}) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  const { auth_token } = useSelector((state) => state.user.currentUser);
    
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://Localhost:5000/products/list?categories=${cat}`
            : `http://Localhost:5000/products/list`,
          {
            headers: {
              Authorization: `Bearer ${auth_token}`,
            },
          }
        );
        if (res.data) {
          setProducts(res.data.Product);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [cat]);

  console.log(products)

  useEffect(() => {
    cat &&
      setFilterProducts(
        products.filter((item) =>
          Object.entries(filter).every(([key, value]) => {
            return key === "size"
              ? item.Size.find((k) => k.name === value)
              : item.Color.find((k) => k.name === value);
          })
        )
      );
  }, [filter, cat, products]);

  useEffect(() => {
    if (sort === "newest") {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => a.CreatedAt - b.CreatedAt)
      );
    } else if (sort === "asc") {
      setFilterProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilterProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

    return (
      <Container>
        <H1>OUR PRODUCT</H1>
        <Wrapper>
        {cat
        ? filterProducts.map((item) => {
            return <ProductItem key={item.ID} item={item} />;
          })
        : products.map((item) => {
            return <ProductItem key={item.ID} item={item} />;
          })}
        </Wrapper>
        </Container>
    );
};

export default Product;
