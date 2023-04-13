import React from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Products from "../Components/Products";
import Footer from "../Components/Footer";
import { mobile } from "../responsive";
import { useState } from "react";

const Container = styled.div`
padding: 10px;
margin-top: 10%;
display:flex;
flex-direction:column;
align-items:center;
${mobile({ marginTop: "20%" })}
`;

const Title = styled.h1`
  margin: 10px;
  padding:10px;
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

const AllProducts = () => {
  const [sort, setSort] = useState("newest");
  const [cat, setCat] = useState("");
  return (
    <>
      <Navbar />
      <Container>
        <Title>All Products</Title>
        <div style={{display:"flex"}}>
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
        <FilterContainer>
          <Filter>
            <FilterText>Sort by Category:</FilterText>
            <Select onChange={(e) => setCat(e.target.value)}>
              <Option value="">All Products</Option>
              <Option value="Cake">Cake</Option>
              <Option value="Cookies">Cookies</Option>
              <Option value="Cupcakes">Cupcakes</Option>
              <Option value="Pastry">Pastry</Option>
            </Select>
          </Filter>
          </FilterContainer>
          </div>
        <Products cat={cat} sort={sort} />
      </Container>
      <Footer />
    </>
  );
};

export default AllProducts;
