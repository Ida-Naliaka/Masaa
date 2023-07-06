import React from "react";
import { MenuItem, Menu, Badge } from "@material-ui/core";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  Person,
  PersonAddOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShopNavbar = () => {
  const navigate = useNavigate();
  const quantity = useSelector((state) => state.cart.quantity);
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
      .delete(
        `http://localhost/ecommerce/php-react-website-store/server/index.php?direct=user?userid=${user.userid}`,
        config
      )
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <nav
      className="top-0 left-0 bg-gray-900 w-full fixed md:h-[15vh] h-12 flex justify-center"
      style={{ zIndex: 4 }}
    >
      <div className=" w-full flex text-white items-center justify-between mr-[7%] ml-[5%]">
        <div className="flex items-center flex-1 md:mb-0 mb-6 md:justify-center justify-between">
          <div className="md:hidden contents cursor-pointer ml-0 m-[5px] p-[5px]">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <MenuIcon
                    style={{ fontSize: "30px" }}
                    {...bindTrigger(popupState)}
                  />
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem
                      onClick={() => {
                        popupState.close();
                        navigate("/");
                      }}
                    >
                      Our Website
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        popupState.close();
                        navigate("/products");
                      }}
                    >
                      All Products
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        popupState.close();
                        navigate("/cart");
                      }}
                    >
                      <Badge badgeContent={quantity} color="primary">
                        Cart
                        <ShoppingCartOutlined />
                      </Badge>
                    </MenuItem>
                    {user && (
                      <MenuItem
                        onClick={() => {
                          handleLogOut();
                          popupState.close();
                        }}
                      >
                        Logout
                      </MenuItem>
                    )}
                    {user && (
                      <MenuItem
                        onClick={() => {
                          handleDelete();
                          popupState.close();
                        }}
                      >
                        Delete
                      </MenuItem>
                    )}

                    {!user && (
                      <MenuItem
                        onClick={() => {
                          navigate("/signup");
                          popupState.close();
                        }}
                      >
                        Register
                      </MenuItem>
                    )}
                    {!user && (
                      <MenuItem
                        onClick={() => {
                          navigate("/login");
                          popupState.close();
                        }}
                      >
                        Sign In
                      </MenuItem>
                    )}
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
          <h1 
          className=" flex justify-center font-[bold] md:tracking-[5px] tracking-[2px] md:mb-0 mb-2.5 md:text-[45px] text-3xl p-[5px]"
          style={{fontFamily: '"Satisfy", cursive'}}>
            Masaa
          </h1>
        </div>
        <div className="md:flex hidden justify-center ">
          <Link to="/" style={{ textDecoration: "none" }}>
            <MenuItem>Our Website</MenuItem>
          </Link>
          <Link to="/shop" style={{ textDecoration: "none" }}>
            <MenuItem>Homepage</MenuItem>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <MenuItem>All Products</MenuItem>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <MenuItem onClick={() => navigate("/cart")}>
              <Badge
                overlap="rectangular"
                badgeContent={quantity}
                color="primary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
          {user ? (
            <div className="md:text-xl text-base cursor-pointer text-black md:ml-6 ml-2">
              <Person
                data-tip
                data-tooltip-id="logoutTip"
                data-event="click"
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "white",
                }}
              />
              <ReactTooltip
                id="logoutTip"
                place="bottom"
                effect="solid"
                clickable={true}
              >
                <span
                  className="bg-white text-black text-center h-fit rounded-lg md:text-xl text-base cursor-pointer w-full p-2 m-2 flex justify-center"
                  onClick={() => handleLogOut()}
                >
                  Logout
                </span>
                <span
                  className="bg-white text-black text-center h-fit rounded-lg md:text-xl text-base cursor-pointer w-full p-2 m-2 flex justify-center"
                  onClick={() => handleDelete()}
                >
                  Delete
                </span>
              </ReactTooltip>
            </div>
          ) : (
            <div className="md:text-xl text-base cursor-pointer text-black md:ml-6 ml-2">
              <PersonAddOutlined
                data-tip
                data-tooltip-id="registerTip"
                data-event="click"
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "white",
                }}
              />
              <ReactTooltip
                id="registerTip"
                place="bottom"
                effect="solid"
                clickable={true}
              >
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <span className="bg-white text-black text-center h-fit rounded-lg md:text-xl text-base cursor-pointer w-full p-2 m-2 flex justify-center">
                    REGISTER
                  </span>
                </Link>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <span className="bg-white text-black text-center h-fit rounded-lg md:text-xl text-base cursor-pointer w-full p-2 m-2 flex justify-center">
                    SIGN IN
                  </span>
                </Link>
              </ReactTooltip>
            </div>
          )}
        </div>
      </div>
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
    </nav>
  );
};

export default ShopNavbar;
