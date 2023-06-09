import React from "react";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { mobile } from "../Responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutSuccess } from "../redux/userSlice";
import Brand from "../asset/E-COM.svg"


const Container = styled.div`
  height: 60px;

  ${mobile({
    height: "50px",
  })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({
    padding: "10px 0px",
  })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgrey;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "2px" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  text-transform: uppercase;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-transform: uppercase;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = ({user}) => {
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch()
  const history = useHistory()

  const signout = () => {
    console.log("signout")
    dispatch(logoutSuccess())
    history.push('/login')
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="nice search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center><img src={Brand} className="img-fluid" width={200} /></Center>
        <Right>
          {!user ?
            (
              <>
                <MenuItem onClick={signout}>SignOut</MenuItem>
              </>
            )
             : 
            (<>
              <Link to={"/register"} style={{ color: "#213547", textDecoration: "none" }}>
                <MenuItem>Register</MenuItem>
              </Link>
              <Link to={"/login"} style={{ color: "#213547", textDecoration: "none" }}>
                <MenuItem>Login</MenuItem>
              </Link>
            </>)
            
          }
          <Link to="/cart" style={{ color: "inherit" }}>
            <MenuItem>
              <Badge color="primary" badgeContent={quantity}>
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;