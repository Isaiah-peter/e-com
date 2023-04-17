import React from "react";
import styled from "styled-components";
import { Send } from "@material-ui/icons";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;
const Description = styled.p`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;
const Button = styled.button`
  color: white;
  background-color: teal;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border: none;
  cursor: pointer;
`;

const NewLetter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely update for new product.</Description>
      <InputContainer>
        <Input type="email" placeholder="your email..." />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewLetter;