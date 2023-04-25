import React from "react";
import styled from "styled-components";
import Navbar from "../component/Navbar";
import Announcement from "../component/Announcement";
import Footer from "../component/Footer";
import {removeProduct} from "../redux/cartRedux"
import { Add, Remove } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { PaystackConsumer } from "react-paystack";
import { Link } from "react-router-dom";

const KEY = import.meta.env.VITE_APP_PAYSTACK;
console.log(KEY)

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;
const Title = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-weight: 300;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.a`
  font-weight: 600;
  cursor: pointer;
  padding: 10px;
  text-transform: uppercase;
  border: 1px solid black;
  border: ${(props) => props.typed === "filled" && "none"};
  background: ${(props) =>
    props.typed === "filled" ? "black" : "transparent"};
  color: ${(props) => (props.typed === "filled" ? "white" : "black")};
`;

const TopTexts = styled.div``;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

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

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 20px;
`;

const Summary = styled.div`
  flex: 0.9;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: inherit;
`;

const SummaryTitle = styled.h1`
  font-weight: 100;
  text-transform: uppercase;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => props.typed === "total" && "24px"};
  font-weight: ${(props) => props.typed === "total" && "500"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  font-weight: 600;
  padding: 10px;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch()
  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: cart.totalPrice * 100,
    publicKey: KEY,
  };

  const handleSuccess = (reference) => {
    dispatch(removeProduct())
    console.log(reference)
  };

  const handleClose = () => {
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your bag</Title>
        <Top>
          <Link to='/'>continue shopping</Link>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton typed="filled">checkout</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((p) => (
              <>
                <Product>
                  <ProductDetail>
                    <Image src={p.url} />
                    <Detail>
                      <ProductName>
                        <b>Product:</b> {p.name}
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
                    <ProductPrice>$ {p.price * p.quantity}</ProductPrice>
                  </PriceDetail>
                </Product>
                <Hr />
              </>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>Order summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>SubTotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem typed="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <div className="w-100 mb-3">
              <label className="label-form">Address</label>
              <input type="text" className="form-control" />
            </div>
            <PaystackConsumer {...componentProps}>
              {({ initializePayment }) => (
                <Button
                  onClick={() => initializePayment(handleSuccess, handleClose)}
                >
                  Checkout
                </Button>
              )}
            </PaystackConsumer>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
