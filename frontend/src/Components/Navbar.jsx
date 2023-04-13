import React from "react";
import { Badge } from "@material-ui/core";
import {
  Person,
  PersonAddOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../redux/userRedux";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { MenuItem, Menu } from "@material-ui/core";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MenuIcon from "@material-ui/icons/Menu";

const Container = styled.div`
  height: 60px;
  top: 0;
  left: 0;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 0px 8px;
  width: 100%;
  padding-bottom: 30px;
  z-index: 4;
  position: fixed;
  ${mobile({ position: "absolute", height: "40px" })}
`;

const Wrapper = styled.div`
  margin-right: 7%;
  margin-left: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px", marginRight: "10%" })}
`;
const Hamburger= styled.div`
display:none;
${mobile({ padding:"5px",
  display:"contents",
  margin: "5px",
  cursor: "pointer",
marginLeft:0})}
`
const Left = styled.div`
  flex: 1;
  margin-left: 8%;
  display: flex;
  align-items: center;
  ${mobile({ marginBottom: "25px", marginTop: "0", marginLeft:"0", justifyContent:"space-between" })};
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 44px;
  font-family: "Satisfy", cursive;
  ${mobile({fontSize: "30px",
  display: "flex",
  justifyContent: "center",
  })}
`;
const Right = styled.div`
  display: flex;
  align-items: center;

  ${mobile({ display:"none" })}
`;
const RightItems = styled.div`
  display: flex;
  justify-content: space-around;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuComponent = styled.div`
  font-size: 20px;
  cursor: pointer;
  color: black;
  margin-left: 25px;
  ${mobile({ fontSize: "16px", marginLeft: "10px" })}
`;
const SpanContainer = styled.span`
  background-color: white;
  color: black;
  font-size: 18px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  padding: 10px 15px;
  margin: 10px;
  display: flex;
  border-radius: 20px;
  justify-content: space-around;
  line-height: 1px;
`;
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleDelete = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios
      .delete(`https://pastrybox.000webhostapp.com/server/index.php?direct=user?userid=${user.userid}`, config)
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <Container>
      <Wrapper>
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
                          navigate("/");
                        }}>
                        Our Website
                    </MenuItem>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          navigate("/products");
                        }}>
                        All Products
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          navigate("/cart")}}>
                        <Badge badgeContent={quantity} color="primary">
                          Cart<ShoppingCartOutlined /> 
                          </Badge>
                      </MenuItem>
                    {user &&
                      <MenuItem onClick={() => {
                        handleLogOut();
                        popupState.close();
                      }}>
                        Logout
                      </MenuItem>}
                    {user && <MenuItem onClick={() => {
                      handleDelete();
                      popupState.close()
                    }}>
                      Delete
                    </MenuItem>}
        
              
                    {!user && <MenuItem onClick={() => {
                      navigate("/signup");
                      popupState.close()
                    }}>
                      Register
                    </MenuItem>}
                    {!user && <MenuItem onClick={() => { navigate("/login"); popupState.close(); }}>
                      Sign In
                    </MenuItem>}
            </Menu>
            </React.Fragment>
                )}
              </PopupState>
            </Hamburger>
          <Logo>Baked</Logo>
        </Left>

        <Right>
          <RightItems>
            <Link to="/" style={{ textDecoration: "none" }}>
              <MenuComponent>Our Website</MenuComponent>
            </Link>
             <Link to="/shop" style={{ textDecoration: "none" }}>
              <MenuComponent>Homepage</MenuComponent>
            </Link>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <MenuComponent>All Products</MenuComponent>
            </Link>
            <Link to="/cart">
              <MenuComponent>
                <Badge overlap="rectangular" badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuComponent>
            </Link>
            {user ? (
              <MenuComponent>
                <Person
                  data-tip
                  data-tooltip-id="logoutTip"
                  data-event="click"
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    marginLeft: "25px",
                  }}
                />
                <ReactTooltip
                  id="logoutTip"
                  place="bottom"
                  effect="solid"
                  clickable={true}
                >
                  <SpanContainer onClick={() => handleLogOut()}>
                    Logout
                  </SpanContainer>
                  <SpanContainer onClick={() => handleDelete()}>
                    Delete{" "}
                  </SpanContainer>
                </ReactTooltip>
              </MenuComponent>
            ) : (
              <MenuComponent>
                <PersonAddOutlined
                  data-tip
                  data-tooltip-id="registerTip"
                  data-event="click"
                />
                <ReactTooltip
                  id="registerTip"
                  place="bottom"
                  effect="solid"
                  clickable={true}
                >
                  <SpanContainer>
                    <Link to="/signup" style={{ textDecoration: "none" }}>
                      {" "}
                      <MenuComponent>REGISTER</MenuComponent>{" "}
                    </Link>
                  </SpanContainer>
                  <SpanContainer>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <MenuComponent>SIGN IN</MenuComponent>
                    </Link>
                  </SpanContainer>
                </ReactTooltip>
              </MenuComponent>
            )}
          </RightItems>
        </Right>
      </Wrapper>
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};

export default Navbar;
