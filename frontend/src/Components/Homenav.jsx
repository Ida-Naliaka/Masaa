import React from "react";
import { MenuItem, Menu } from "@material-ui/core";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useNavigate } from "react-router-dom";

const Homenav = () => {
  const navigate = useNavigate();
  return (
    <nav className="top-0 left-0 bg-gray-900 w-full fixed md:h-[15vh] h-12 flex justify-center" style={{zIndex:4}}>
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
                        document.getElementById("about").scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      About
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        popupState.close();
                        document.getElementById("collections").scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      Collections
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/shop");
                        popupState.close();
                      }}
                    >
                      Our Shop
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/statusupdate");
                        popupState.close();
                      }}
                    >
                      Order Tracking
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
          <h1 className="flex justify-center font-[bold] md:tracking-[5px] tracking-[2px] md:mb-0 mb-2.5 md:text-[45px] text-3xl p-[5px]"
          style={{fontFamily: '"Satisfy", cursive'}}>Masaa</h1>
        </div>
        <div className="md:flex hidden justify-center ">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <MenuItem>Home</MenuItem>
          </Link>
          <MenuItem
            onClick={() => {
              document.getElementById("about").scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            About
          </MenuItem>
          <MenuItem
            onClick={() => {
              document.getElementById("collections").scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Our Collections
          </MenuItem>
          <Link to="/shop" style={{ textDecoration: "none", color: "white" }}>
            <MenuItem>Shop</MenuItem>
          </Link>
          <Link
            to={"/statusupdate"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <MenuItem>Order Tracking</MenuItem>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Homenav;
