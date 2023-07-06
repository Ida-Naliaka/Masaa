import React from "react";
import styled from "styled-components";
import Slider from "../Components/Slider";
import Footer from "../Components/Footer";
import { mobile } from "../responsive";
import Homenav from "../Components/Homenav";
import { CreditCardTwoTone, Motorcycle, ShoppingCart } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

const Section = styled.div`
  display: flex;
  text-align: center;
  padding: 10px;
  width: 40%;
  height: fit-content;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: "Bitter", serif;
  font-weight: 300;
  ${mobile({ width: "80%"})}
`;
const AboutTitle = styled.h4`
  font-family: "Dancing Script", cursive;
  font-size: 24px;
  ${mobile({ fontSize: "18px" })}
`;
const LandingPage = () => {
  const navigate= useNavigate();
  return (
    <div className="w-full overflow-hidden">
      <Homenav />
      <Slider />
      <div
      className="w-3/12 flex flex-col justify-center items-center text-center md:text-xl text-[15px] leading-[25px] w-[90vw] md:mx-auto ml-2.5 my-[50px]"
      id="about">
        <h1 className="text-2xl font-semibold mb-5"style={{ fontFamily: "'Satisfy', cursive" }}>Welcome to Masaa</h1>
        There are many variations of passages of Lorem Ipsum available,but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don't look even slightly believable. If you are
        going to use a passage of Lorem Ipsum, you need to be sure there isn't
        anything embarrassing hidden in the middle of text. All the Lorem Ipsum
        generators on the Internet tend to repeat predefined chunks as
        necessary, making this the first true generator on the Internet.
      </div>
      <hr />
      <div className="flex md:flex-row flex-col justify-around items-center h-1/5 mx-auto md:my-[50px] my-2.5">
        <Section>
          <Motorcycle style={{ fontSize: "70px", color: "#E97451" }} />
          <AboutTitle>Shipping and Return</AboutTitle>
          Return unopened and unused merchandise in its original condition
          within 30 days for a full refund
        </Section>
        <Section>
          <CreditCardTwoTone style={{ fontSize: "60px", color: "#E97451" }} />
          <AboutTitle>Safe Payment</AboutTitle>
          Pay with the world's most popular and secure Payment methods
        </Section>
        <Section>
          <ShoppingCart style={{ fontSize: "60px", color: "#E97451" }} />
          <AboutTitle>Shop with Confidence</AboutTitle>
          Our Buyer Protection covers your purchase from click to delivery.All our products come with a 1 year warranty
        </Section>
      </div>
      <hr />
      <div className="flex md:flex-row flex-col justify-around items-center h-1/5 mx-auto md:my-[50px] my-2.5" id="collections">
        <Section>
          <img
          className="align-middle md:w-[200px] w-[100px] md:h-[200px] h-[100px] mt-2.5 rounded-[50%]"
          src="https://firebasestorage.googleapis.com/v0/b/ecommerce-php-d25c1.appspot.com/o/male%20model.png?alt=media&token=de6a8e7b-021f-4ce7-a2fb-b7bc4a062a2e"
            alt="Men's watches"/>
          <AboutTitle>Men</AboutTitle>
          <button
          className="text-[15px] text-[black] border bg-[white] cursor-pointer mt-2.5 mb-[5px] mx-0 p-2.5 rounded-[10%] border-solid border-[black]"
          onClick={()=>navigate('/products/Men')}>
            View Products
          </button>
        </Section>
        <Section>
          <img
          className="align-middle md:w-[200px] w-[100px] md:h-[200px] h-[100px] mt-2.5 rounded-[50%]"
          src="https://firebasestorage.googleapis.com/v0/b/ecommerce-php-d25c1.appspot.com/o/lady%20model.jpg?alt=media&token=142524c9-f25e-4d61-bb96-32a79385b9d8"
            alt="Women's watches"/>
          <AboutTitle>Women</AboutTitle>
          <button className="text-[15px] text-[black] border bg-[white] cursor-pointer mt-2.5 mb-[5px] mx-0 p-2.5 rounded-[10%] border-solid border-[black]"
           onClick={()=>navigate('/products/Women')}>
            View products
          </button>
        </Section>
        <Section>
          <img
          className="align-middle md:w-[200px] w-[100px] md:h-[200px] h-[100px] mt-2.5 rounded-[50%]"
          src="https://firebasestorage.googleapis.com/v0/b/ecommerce-php-d25c1.appspot.com/o/kiddies%20purple%20butterfly.jpg?alt=media&token=0b7a5cda-4bb5-485c-b2a5-c125b9eb3086"
            alt="Kids' watches"/>
          <AboutTitle>Kiddies</AboutTitle>
          <button className="text-[15px] text-[black] border bg-[white] cursor-pointer mt-2.5 mb-[5px] mx-0 p-2.5 rounded-[10%] border-solid border-[black]"
           onClick={()=>navigate('/products/Kiddies')}>
            View products
          </button>
        </Section>
        <Section>
         <img
         className="align-middle md:w-[200px] w-[100px] md:h-[200px] h-[100px] mt-2.5 rounded-[50%]"
         src="https://firebasestorage.googleapis.com/v0/b/ecommerce-php-d25c1.appspot.com/o/tbar%20chain%20bracelet%20mens.jpg?alt=media&token=f84b99fe-5bd5-4107-9ca6-36e0ae02592a"
            alt="jewellery"/>
          <AboutTitle>Jewellery</AboutTitle>
          Frost yourself
          <button className="text-[15px] text-[black] border bg-[white] cursor-pointer mt-2.5 mb-[5px] mx-0 p-2.5 rounded-[10%] border-solid border-[black]"
           onClick={()=>navigate('/products/Jewellery')}>
            View Products
          </button>
        </Section>
      </div>
      <Footer />
    </div>
  );
};
export default LandingPage;
