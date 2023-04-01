import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 100vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({ height: "50vh" })}
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  height: fit-content;
  ${mobile({
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: "20px",
  })}
`;
const Portfolio = () => {
  const portfolio = [];
  return (
    <Container>
      <Title>Our Gallery</Title>
      <Desc>Here is some of our work!...for your inspiration</Desc>
      <ImageContainer>
          {portfolio.map((item) => (
            <img src={item} alt="portfolio"/>
          ))}
        </ImageContainer>
    </Container>
  );
};

export default Portfolio;
