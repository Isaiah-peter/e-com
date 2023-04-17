import React, { useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Announcement from "../component/Announcement";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import NewLetter from "../component/NewLetter";
import Product from "../component/Product";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  text-transform: capitalize;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const ProductList = () => {
  const loc = useParams();
  const cat = loc.category;
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Product:</FilterText>
          <Select name="color" onChange={handleFilter}>
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>green</Option>
            <Option>yellow</Option>
          </Select>
          <Select name="size" onChange={handleFilter}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Product:</FilterText>
          <Select name="price" onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (Ase)</Option>
            <Option value="desc">Price (Desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Product cat={cat} filter={filter} sort={sort} />
      <NewLetter />
      <Footer />
    </Container>
  );
};

export default ProductList;
