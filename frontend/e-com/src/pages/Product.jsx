import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Announcement from "../component/Announcement";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import NewLetter from "../component/NewLetter";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import {popularProduct} from "../data"

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  padding: 3px;
  border: 0.4px solid teal;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: #fff;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 500;
  text-transform: uppercase;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const loc = useParams();
  const id = loc.id;
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getProduct = async () => {
      for (let i of popularProduct) {
        if (i.id == id) {
          console.log(i)
          setProduct(i)
          return
        }
      }
    };
    getProduct();
  }, [id]);

  const handleCart = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  const handleQuantity = (condition) => {
    if (condition === "desc") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  console.log(size, color);

  return (
    <Container>
      <Navbar />
      <Announcement />
      {product.length !== 0 && (
        <Wrapper>
          <ImageContainer>
            <Image src={product.image_url} />
          </ImageContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.description}</Desc>
            <Price>$ {product.price}</Price>
            <FilterContainer>
              {product.length !== 0 && (
                <Filter>
                  <FilterTitle>Color</FilterTitle>
                  {product.Color?.map((c) => (
                    <FilterColor
                      color={c.name}
                      onClick={() => setColor(c.name)}
                    />
                  ))}
                </Filter>
              )}
              <Filter>
                <FilterTitle>Size</FilterTitle>
                {product.length !== 0 && (
                  <FilterSize onChange={(e) => setSize(e.target.value)}>
                    {product.Size?.map((s) => (
                      <FilterSizeOption>{s.name}</FilterSizeOption>
                    ))}
                  </FilterSize>
                )}
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuantity("desc")}
                />
                <Amount>{quantity}</Amount>
                <Add
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuantity("asc")}
                />
              </AmountContainer>
              <Button onClick={handleCart}>Add to cart</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
      <NewLetter />
      <Footer />
    </Container>
  );
};

export default Product;
