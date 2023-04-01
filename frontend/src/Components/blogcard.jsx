import React from "react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  padding: 20px;
  min-width: 280px;
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 1;
  font-family: "Dancing Script", cursive;
  ${mobile({ width: "200px", height: "280px", fontSize: "15px" })}
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
`;
const Text = styled.p`
  font-size: 22px;
  margin: 10px;
  line-height: 20px;
  color: black;
  text-align: center;
  text-decoration: none;
`;

const Image = styled.img`
  height: 250px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  z-index: 2;
`;

const Blog = ({ item }) => {
  return (
    <Container>
      <a href={item.link}>
        <Image src={item.thumbnail} alt={item.title} />
        <InfoContainer>
          <Text>
            <b>{item.title}</b>
          </Text>
          <Text>{item.date}</Text>
        </InfoContainer>
      </a>
    </Container>
  );
};

export default Blog;
