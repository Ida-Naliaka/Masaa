import React from "react";
import styled from "styled-components";
import ShopNavbar from "../Components/ShopNavbar";
import Products from "../Components/Products";
import Footer from "../Components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div`
  ${mobile({ padding: "15px", marginTop: "15%", flexDirection: "column" })}
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [sort, setSort] = useState("newest");
  return (
    <Container>
      <ShopNavbar />
      <Container
        style={{
          padding: "10px",
          marginTop: "10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="m-1">{cat}</h1>
        <div className="flex justify-between">
          <Filter>
            <span className="text-xl font-semibold md:mr-5 mr-0">Sort Products:</span>
            <select className="p-2 md:mr-5 mr-0 md:my:0 my-2" onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="asc">Price (asc)</option>
              <option value="desc">Price (desc)</option>
            </select>
          </Filter>
        </div>
        <Products cat={cat} sort={sort} />
      </Container>
      <Footer />
    </Container>
  );
};

export default ProductList;
