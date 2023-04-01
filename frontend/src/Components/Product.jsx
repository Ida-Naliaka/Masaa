import React from "react";
import {
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProduct } from "../redux/cartRedux";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 180px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
      ellipse farthest-corner at right bottom,
      #fedb37 0%,
      #fdb931 8%,
      #9f7928 30%,
      #8a6e2f 40%,
      transparent 80%
    ),
    radial-gradient(
      ellipse farthest-corner at left top,
      #ffffff 0%,
      #ffffac 8%,
      #d1b464 25%,
      #5d4a1f 62.5%,
      #5d4a1f 100%
    );
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 0px;
  background: black;
  opacity: 0.4;
  width: 100%;
  height: 50%;
`;
const Text = styled.p`
  font-size: 15px;
  color: white;
  margin: 2px;
  text-align: center;
`;

const Image = styled.img`
  height: 50%;
  width:180px;
  margin-top: 20px;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addToCart = () => {
    if (cart.products.some(product => product.sku === item.sku)) {
      toast.warning('item already in cart')
    } else {
      dispatch(addProduct({ ...item, "quantity": 1 }));
      toast.success(`${item.name} added to cart`);
    }
  };

  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Icon onClick={() => addToCart()}>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/products/product/${item.sku}`}>
            <SearchOutlined />
          </Link>
        </Icon>
      </Info>
      <InfoContainer>
        <Text style={{ color: "#ffffac", letterSpacing: "2px" }}>
          <b>{item.name}</b>
        </Text>
        <Text>
          <b>{item.value}</b>
        </Text>
        <Text style={{ color: "#ffffac", letterSpacing: "2px" }}>
          <b>{item.price}/=</b>
        </Text>
      </InfoContainer>
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

export default Product;
