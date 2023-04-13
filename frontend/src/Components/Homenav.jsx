import React from 'react'
import {MenuItem, Menu } from "@material-ui/core";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MenuIcon from "@material-ui/icons/Menu";
import { mobile } from "../responsive";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const NavContainer = styled.nav`
  height: 80px;
  top: 0;
  left: 0;
  background: white;
  width: 100%;
  padding-bottom: 20px;
  z-index: 4;
  position: fixed;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  ${mobile({ height: "50px" })}
`;
const NavWrapper = styled.div`
  margin-right: 7%;
  margin-left: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ marginBottom: "25px", marginTop: "0", marginLeft:"0", justifyContent:"space-between" })};
`;
const Hamburger= styled.div`
display:none;
${mobile({ padding:"5px",
  display:"contents",
  margin: "5px",
  cursor: "pointer",
marginLeft:0})}
`
const Logo = styled.h1`
  font-weight: bold;
  letter-spacing: 5px;
  font-family: "Satisfy", cursive;
  font-size: 45px;
  ${mobile({ fontSize: "30px", letterSpacing: "2px",marginBottom:"10px", display: "flex",
  justifyContent: "center" })}
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ display:"none" })}
`;
const MenuComponent = styled.div`
  font-size: 18px;
  cursor: pointer;
  width: fit-content;
  margin-left: 25px;
  ${mobile({ marginLeft: "20px" })}
`;
const Homenav = () => {
       const navigate = useNavigate();
  return (
   <NavContainer>
        <NavWrapper>
          <Left>
          <Hamburger>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <MenuIcon
                    style={{fontSize:"30px"}}
                    {...bindTrigger(popupState)}
                    />
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          document.getElementById('about').scrollIntoView({
                            behavior: 'smooth'})}}>
                        About
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          document.getElementById('menus').scrollIntoView({
                            behavior: 'smooth'})
                          }}>
                              Menus
                                      </MenuItem>
                                      <MenuItem
                                          onClick={() => {
                                              popupState.close();
                                              document.getElementById('pricing').scrollIntoView({
                            behavior: 'smooth'})
                                          }}>
                              Pricing
                      </MenuItem>
              <MenuItem onClick={() => {
                navigate("/shop");
                popupState.close();
              }}>
                Our Shop
                    </MenuItem>
            <MenuItem onClick={() => {
                navigate("/statusupdate");
                popupState.close();
              }}>Order Tracking</MenuItem>
            </Menu>
            </React.Fragment>
                )}
              </PopupState>
            </Hamburger>
            <Logo>Baked</Logo>
          </Left>
              <Right>
                  <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                      <MenuComponent>Home</MenuComponent>
                      </Link>
              <MenuItem onClick={()=>{document.getElementById('about').scrollIntoView({
                            behavior: 'smooth'})}}>About</MenuItem>            
              <MenuItem onClick={()=>{document.getElementById('menus').scrollIntoView({
                  behavior: 'smooth'
              })
          }}>Menus</MenuItem>
          <MenuItem onClick={()=>{document.getElementById('pricing').scrollIntoView({
                  behavior: 'smooth'
              })
                  }}>Pricing</MenuItem>
                  <Link to="/shop" style={{ textDecoration: "none", color: "black" }}>
                      <MenuItem>Shop</MenuItem>
          </Link>
          <Link to={"/statusupdate"} style={{ textDecoration: "none", color: "black" }}>
            <MenuItem>Order Tracking</MenuItem>
          </Link> 
                  
          </Right>
        </NavWrapper>
      </NavContainer>
  )
}

export default Homenav
