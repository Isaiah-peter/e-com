import { RemoveRedEyeOutlined, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import "./login.css"
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #4387c6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f8ffae,
    #4387c6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f8ffae,
    #4387c6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  overflow: hidden;
`;
const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background: white;
  border-radius: 10px;
`;
const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 300;
  text-transform: uppercase;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  position: relative;
`;
const Input = styled.input`
  flex: 1;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 20px;
`;
const Agreement = styled.div`
  font-size: 12px;
`;
const Button = styled.button`
  border: none;
  width: 40%;
  padding: 10px;
  background-color: #4387c6;
  color: white;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  position: absolute;
  right: 2%;
  top: 32%;
`;

const SellerDiv = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-bottom: 20px;
`
const Label = styled.label`
  font-size: 16px;
  margin-left: 10px;
`

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [check, setCheck] = useState(false)
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    profile: 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg',
    seller: false
  })

  const history = useHistory()

  const handleCheck = () => {
    setCheck(!check)
  }
  const handleChange = (e) => {
    e.preventDefault();
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    let registerduser = {...user, 'is_seller': check}

    try {
      await axios.post('http://Localhost:5000/register', registerduser)
      history.push('/login')
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <Container>
      <Wrapper>
        <Title>Create an Account </Title>
        <Link
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#4387c6",
            width: "16%",
          }}

          className="login d-flex align-items-center justify-content-center"
          
          to={'/login'}
        >
          Login
        </Link>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="username" name="username" onChange={(e) => handleChange(e)} />
          <Input placeholder="name" name="name" onChange={(e) => handleChange(e)} />
          <Input
            placeholder="password"
            name="password"
            type={showPassword === false ? "text" : "password"}
            onChange={(e) => handleChange(e)}
          />
          <Icon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <RemoveRedEyeOutlined /> : <VisibilityOff />}
          </Icon>
          <Input placeholder="email" type="email" name="email" onChange={(e) => handleChange(e)} />
          <Input placeholder="phone" name="phone" onChange={(e) => handleChange(e)} />
          <SellerDiv>
          <div class="form-check">
            <input className="form-check-input" type="checkbox" id="defaultCheck1" onChange={handleCheck}/>
            <label className="form-check-label" htmlFor="seller">
              Register as seller
            </label>
          </div>
          </SellerDiv>
          <Agreement>
            By Creating ths account mean that you consent to follow the{" "}
            <b>Private Policy</b>
          </Agreement>
          <Button type="submit" >
            Create
          </Button >
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
