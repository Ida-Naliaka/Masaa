import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Wrapper = styled.div`
  padding: 20px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: center;
  border:2px solid black;
  ${mobile({ padding: "10px" })}
`;

const Header = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Detail = styled.div`
  flex: 2;
  display: flex;
  line-height:25px;
`;
const Success = () => {
  const location = useLocation();
  const url = window.location.href;
  var splitUrl = url.split("/");
  const pid = splitUrl[splitUrl.length - 1];
  const data = location.state;
  const address = data.address;
  const cart = data.products;
  const phone = data.phone;
  const txn_id = data.txn_id;
  const orderid = data.orderid;
  const paid_amount = data.paid_amount;
  const paid_amount_currency = 'usd';
  const user = useSelector((state) => state.user.currentUser);
console.log(data);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
       <Wrapper>
      {pid?
        <>
          <Header>Order Created Successfully!</Header>
          <Title><b>Payment Information</b></Title>
          <Detail>Payment Reference Number: {orderid}</Detail>
          <Detail>Transaction ID: {txn_id}</Detail>
          <Detail>Paid Amount:{paid_amount + '' + paid_amount_currency}</Detail>
          <Detail>Payment Status: Success</Detail>

          <Title><b>Customer Information</b></Title>
          <Detail>Name: {user.name}</Detail>
          <Detail>Email:{user.email}</Detail>
          <Detail>Phone:{phone}</Detail>
          <Detail>Address:{address}</Detail>
    
          <Title><b>Product Information</b></Title>
          {cart.products.map((item)=>
            <>
              <Detail>Name: {item.name + " -> " + item.quantity}</Detail>
              <Detail>Price: {item.price * item.quantity + ' ' + paid_amount_currency}</Detail></>)}
        </>
        :
        <>
          <Header className="error">Your Payment has failed!</Header>
          <Title className="error">Order has not been created. Please try again </Title>
        </>
      }
      {orderid &&<b>Order has been created successfully. Your order number is ${orderid}.
       Check the status of your order <Link to="/statusupdate"> here </Link></b>
      }
      <Link to="/shop" style={{ padding: 10, marginTop: 20 }}>
        Return to Shop
        </Link>
        </Wrapper>
    </div>
  );
};

export default Success;
