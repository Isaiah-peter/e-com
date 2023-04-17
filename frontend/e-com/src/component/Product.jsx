import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import {popularProduct} from "../data"
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

const Product = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const getProduct = async () => {
            setProducts(popularProduct);
        };
        getProduct();
    }, []);

    return (
      <Container>
        <H1>OUR PRODUCT</H1>
        <Wrapper>
          {
          products.map((item) => {
              return <ProductItem key={item.ID} item={item} />;
          })
          }
        </Wrapper>
        </Container>
    );
};

export default Product;
