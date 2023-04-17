import React from "react";
import styled from "styled-components";
import { categories } from "../data";
import CategoryItems from "./CategoryItems";
import { mobile } from "../Responsive";

const Container = styled.div`
  width: 100%;
`;

const H1 = styled.h1`
  font-size: 30px;
  text-align: center;
`

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`

const Categories = () => {
  return (
    <Container>
      <H1>CATEGORIES</H1>
      <Wrapper>
        {categories.map((item) => {
          return <CategoryItems key={item.id} item={item} />;
        })}
      </Wrapper>
    </Container>
  );
};

export default Categories;
