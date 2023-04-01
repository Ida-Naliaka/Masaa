import React from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Products from "../Components/Products";
import Footer from "../Components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div`
  ${mobile({ padding: "15px", marginTop: "15%", flexDirection: "column" })}
`;

const Title = styled.h1`
  margin: 5px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [sort, setSort] = useState("newest");
  console.log(location.pathname, cat);
  return (
    <Container>
      <Navbar />
      <Container
        style={{
          padding: "10px",
          marginTop: "10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title>{cat}</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option value="newest">Newest</Option>
              <Option value="asc">Price (asc)</Option>
              <Option value="desc">Price (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products cat={cat} sort={sort} />
      </Container>
      <Footer />
    </Container>
  );
};

export default ProductList;
