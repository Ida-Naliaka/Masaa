import React from "react";
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  height:150px;
  ${mobile({ flexDirection: "column", textAlign: "center" })}
`;
const SocialContainer = styled.div`
  display: flex;
  ${mobile({
    alignItems: "center",
    justifyContent: "center",
  })}
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 20px;
  ${mobile({ marginBottom: "10px", marginTop: "0px" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  padding:5px;
  display: flex;
  align-items: center;
  ${mobile({ marginBottom: "10px" })}
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items:center;
  flex-wrap: wrap;
  width: 100%;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  flex-wrap: wrap;
  width: 100%;
`;
//#E97451
const Footer = () => {
  return (
    <div style={{ background: "black", color: "white"}}>
      <Container>
        <Center>
          <Title>Contact</Title>
           <Column
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems:"center",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
          <Row
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems:"center",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <SocialContainer>
            <a
              href="https://github.com/Ida-Naliaka"
              style={{ textDecoration: "none" }}
            >
              <SocialIcon color="3B5999">
                <Facebook />
              </SocialIcon>
            </a>
            <a href="https://github.com/Ida-Naliaka">
              <SocialIcon color="E4405F">
                <Instagram />
              </SocialIcon>
            </a>
            <a href="https://github.com/Ida-Naliaka">
              <SocialIcon color="E60023">
                <Pinterest />
              </SocialIcon>
            </a>
              </SocialContainer>
            </Row>
            <Row>
          <ContactItem>
            <Phone style={{ marginRight: "5px" }} />+254 7123 45678
          </ContactItem>
          <ContactItem>
            <MailOutline style={{ marginRight: "10px" }} />wafulaida@gmail.com
          </ContactItem>
          <ContactItem>
            <Room style={{ marginRight: "10px" }} />Bihi Towers, Moi Avenue
          </ContactItem>
            </Row>
          </Column>
        </Center>
      </Container>
     <small> &copy;Baked | All Rights Reserved</small>
    </div>
  );
};

export default Footer;
