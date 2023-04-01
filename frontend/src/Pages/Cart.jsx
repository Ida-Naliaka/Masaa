import React, { useEffect, useState } from "react";
import { Add, Remove } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import PaymentCard from "../Components/Payment/PaymentCard";
import { removeProduct, addQuantity, reduceQuantity } from "../redux/cartRedux";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51LwigmHrQFfXoYu84CCBlCE3mtcuVgKzjmhCIpZpa9AILk2lMQROB6ShCU406iNd2zBoUItr2JgGKWBBpxXqH3E400xGdBuIDe');
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
  props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Empty = styled.div`
  display: flex;
  justify-content: Center;
  align-items:center;
  font-size:25px;
  font weight:400;
  color:blue;
  padding-top:30%;

  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  margin-top: 20px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleAdd=(item) => {
    dispatch(addQuantity(item));
  }
  const handleRemove=(item) => {
    cart.products.map((prod) =>
    prod.sku === item.sku && 
      prod.quantity>1 ? dispatch(reduceQuantity(item)) : dispatch(removeProduct(item)))
  }
  useEffect(() => {
    if (stripePromise) {
    console.log('stripepromise in cart works');
  }
},[])

  return (
    user && (
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
              <Title>YOUR CART</Title>s
              <Top>
                <Link to="/shop">
                  {" "}
                  <TopButton>CONTINUE SHOPPING</TopButton>
                </Link>
                <TopTexts>
                  <TopText>Shopping cart({cart.products.length})</TopText>
                  <TopText>Your Wishlist (0)</TopText>
                </TopTexts>
                <TopButton type="filled">CHECKOUT NOW</TopButton>
              </Top>
              <Bottom>
                <Info>
                  {cart.products.map((product) => (
                    <Product key={product.sku}>
                      <ProductDetail>
                        <Image src={product.img} />
                        <Details>
                          <ProductName>
                            <b>Product:</b> {product.name}
                          </ProductName>
                          <ProductId>
                            <b>ID:</b> {product.sku}
                          </ProductId>
                          <ProductSize>
                            <b>Value:</b>{product.value}
                          </ProductSize>
                          <ProductSize>
                            <b>Quantity</b>{product.quantity}
                          </ProductSize>
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductAmountContainer>
                          <Add style={{ cursor: "pointer" }} onClick={() => handleAdd(product)} />
                          <ProductAmount>{product.quantity}</ProductAmount>
                          <Remove style={{ cursor: "pointer" }}
                            onClick={() => handleRemove(product)}
                          />
                        </ProductAmountContainer>
                        <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                      </PriceDetail>
                    </Product>
                  ))}
                  <Hr />
                  {!cart.products.length && <Empty>Cart is empty!</Empty>}
                </Info>
                <Summary>
                  <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                  <SummaryItem>
                    <SummaryItemText>Subtotal</SummaryItemText>
                    <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                    <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Shipping Discount</SummaryItemText>
                    <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem type="total">
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                  </SummaryItem>
                  <Elements stripe={stripePromise}>
                    <PaymentCard amount={cart.total} setPaymentCompleted={setPaymentCompleted} />
                  </Elements>
                </Summary>
              </Bottom>
        </Wrapper>
        <Footer />
      </Container>
    )
  );
};

export default Cart;
