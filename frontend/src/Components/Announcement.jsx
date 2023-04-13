import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
const Container = styled.div`
  height: 40%;
  width:70%;
  background-color: lightgray;
  opacity:.8;
  color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  font-weight: 500;
  margin:50px auto;
  font-family:'Satisfy', cursive;
  letter-spacing:10px;
  ${mobile({ fontSize: "35px" })};
`;
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bg};
  background-image: url('https://firebasestorage.googleapis.com/v0/b/ecommerce-php-d25c1.appspot.com/o/cake%20oclock.webp?alt=media&token=bcf60a9c-2af0-4598-a479-72095e2c1e17');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  ${mobile({ height: "80vh" })}
`;
const Announcement = ({str}) => {
  return(
    <Background bg="lightblue">
      <Container>{str}</Container>
  </Background>)
};

export default Announcement;
