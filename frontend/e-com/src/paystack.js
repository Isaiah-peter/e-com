import React from "react";
import { useSelector } from "react-redux";
import { usePaystackPayment } from "react-paystack";
const KEY = process.env.REACT_APP_PAYSTACK;

const onSuccess = (reference) => {
  console.log(reference);
};

const onClose = () => {
  console.log("closed");
};

const PaystackHookExample = () => {
  const cart = useSelector((state) => state.cart);
  const config = {
    reference: new Date().getTime().toString(),
    amount: cart.totalPrice,
    publicKey: KEY,
  };
  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Paystack Hooks Implementation
      </button>
    </div>
  );
};

export default PaystackHookExample;
