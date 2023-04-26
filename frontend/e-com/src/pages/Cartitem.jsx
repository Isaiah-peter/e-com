import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { pink } from '@material-ui/core/colors';
import { useSelector } from "react-redux";
import axios from 'axios';

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
`;

const ProductName = styled.span``;

const ProductColor = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.span`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 200;
`;

const Cartitem = ({ p }) => {
  const [product, setProduct] = useState([])
  const { auth_token } = useSelector((state) => state.user.currentUser);

  console.log(p.productQty.product_id)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`http://Localhost:5000/product/${p.productQty.product_id}`, {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        });
        console.log(res.data.Product[0])
        setProduct(res.data.Product[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [pink]);

  console.log(product)
  return (
    <div>
      <Product>
        <ProductDetail>
          <Image src={product.url} />
          <Detail>
            <ProductName>
              <b>Product:</b> {product.name}
            </ProductName>
            <ProductColor color={p.color} />
            <ProductSize>
              <b>Product Size:</b> {p.size}
            </ProductSize>
          </Detail>
        </ProductDetail>
        <PriceDetail>
          <ProductAmountContainer>
            <Remove />
            <ProductAmount>{p.quantity}</ProductAmount>
            <Add />
          </ProductAmountContainer>
          <ProductPrice>$ {product.price * p.quantity}</ProductPrice>
        </PriceDetail>
      </Product>
    </div>
  )
}

export default Cartitem