import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import {addProduct, removeProduct} from "./cartRedux"
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:5000/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const cart = async (dispatch, product) => {
  
  try {
    await axios.post("http://localhost:5000/cart", product)
  } catch (e) {
    console.log(e)
  }
}

