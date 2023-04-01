import React, { useState } from "react";
import styled from "styled-components";
import Slider from "../Components/Slider";
import Footer from "../Components/Footer";
import { mobile } from "../responsive";
import { blogs } from "../data";
import Homenav from "../Components/Homenav";
import Announcement from "../Components/Announcement";

const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 50px auto;
  font-family: "Bitter", serif;
  font-size: 20px;
  width: 80%;
  line-height: 52px;
  ${mobile({ fontSize: "15px", marginLeft: "10px", lineHeight: "25px" })}
`;
const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: start;
  margin: 50px auto;
  font-family: "Bitter", serif;
  font-size: 20px;
  width: 100%;
  padding:5px;
  line-height: 52px;
  background:bisque;
  ${mobile({ fontSize: "15px", marginLeft: "10px", lineHeight: "25px" })}
`;
const PricingSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: start;
  margin: 50px auto;
  font-family: "Bitter", serif;
  font-size: 20px;
  width: 100%;
  line-height: 52px;
  padding:5px;
  background: lemonchiffon;
  color:black;
  ${mobile({ fontSize: "15px", marginLeft: "10px", lineHeight: "25px" })}
`;
const InfoWidget = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 50px auto;
  height: 20%;
  ${mobile({ display: "flex", flexDirection: "column", margin: "10px auto" })}
`;
const Section = styled.div`
  display: flex;
  text-align: center;
  padding: 10px;
  width: 40%;
  height: 400px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-family: "Bitter", serif;
  font-weight: 300;
  
  ${mobile({ width: "80%", height: "200px" })}
`;
const AboutTitle = styled.h4`
  font-family: "Dancing Script", cursive;
  font-size: 24px;
  ${mobile({ fontSize: "18px" })}
`;
const Avatar = styled.img` 
  vertical-align: middle;
  margin-top:10px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
`
const Button = styled.button`
  padding: 10px;
  margin:10px 0 5px 0;
  font-size: 15px;
  color: black;
  border: 1px solid black;
  border-radius: 10%;
  background-color: white;
  cursor: pointer;
  ${mobile({ fontSize: "15px" })};
`;
const LandingPage = () => {
  //eslint-disable-next-line
  const [blogItem, setBlogItem] = useState(blogs);

  return (
    <>
      <Homenav />
      <Announcement str="It's Cake O'clock!" />
      <AboutSection id="about">
        
        <h1 style={{ fontFamily: "'Satisfy', cursive" }}>About Us</h1>
        <p>
          Welcome to Baked Bakery! We are a Nairobi based bakery.
          We specialise in french pastries, whipped cream and buttercream Celebration Cakes, Cupcakes and Weddings.
          We have been committed to providing a completely personal service to each of our customers and we strive to perfect every detail to make your cake dreams come true!
          At Baked Bakery we pride ourselves on combining traditional modern and inspired cake design with bold flavors,
          made with the highest quality ingredients. we strive to create baked goods as unique as you
        </p>
      </AboutSection>
      
      <Slider />
      <Announcement str="A party without cake is just a meeting"/>
      <InfoWidget>
        <Section>
          <Avatar src="https://firebasestorage.googleapis.com/v0/b/ecommerce-php-d25c1.appspot.com/o/Loaf%20Cake.jpg?alt=media&token=c3a425c7-b154-4ca3-994d-6bb676af2f53"
            alt="Celebration Cakes Avatar"/>
          <AboutTitle>LOAF CAKES</AboutTitle>
          Our loaf cakes are perfect as gifts, snacks and for tea.
          Available in a variety of flavours, glazed or unglazed to suit your preferences
          <Button>Order Form</Button>
        </Section>
        <Section>
          <Avatar src="https://firebasestorage.googleapis.com/v0/b/ecommerce-php-d25c1.appspot.com/o/cupcakes.jpg?alt=media&token=96e212f1-bb65-4583-9840-fc18396035fc"
            alt="Celebration Cakes Avatar"/>
          <AboutTitle>CUPCAKES</AboutTitle>
          Our cupcakes are always made fresh in small batches by hand.
          They are available in a range of flavours frosted and unfrosted!
          <Button>Order Form</Button>
        </Section>
        <Section>
         <Avatar src="https://firebasestorage.googleapis.com/v0/b/ecommerce-php-d25c1.appspot.com/o/IMG_3339-italian-cookies-1200.jpg?alt=media&token=e0150b53-e860-4ce4-8498-3c2c014b80ac"
            alt="Celebration Cakes Avatar"/>
          <AboutTitle>COOKIES</AboutTitle>
          Our cookies are always made fresh in small batches by hand.
          They are available in a range of flavours that can be custom made to fit any occasion or theme!
          <Button>Order Form</Button>
        </Section>
        <Section>
          <Avatar src="https://firebasestorage.googleapis.com/v0/b/ecommerce-php-d25c1.appspot.com/o/pastries.jpg?alt=media&token=6a2fb3b8-93a0-4ffb-a292-85e4a00f3a87"
            alt="Celebration Cakes Avatar"/>
          <AboutTitle>PASTRIES</AboutTitle>
          Our pastries are always made fresh and delicious in small batches by hand.
          They are available in a range of colours and fun flavours!

          <Button>Order Form</Button>
        </Section>
      </InfoWidget>
      <MenuSection id="menus">
        
        <h1 style={{ fontFamily: "'Satisfy', cursive" }}>Menus</h1>
          <ul>
            <li>Victoria sponge - Vanilla sponge cake layers filled with freshly made strawberry jam filling.</li>
            <li>Carrot cake - moist carrot cake sponge with pecans and walnuts topped with deliciously tangy cream cheese buttercream.</li>
            <li>Red velvet - a delicious vanilla with a light chocolatey flavour topped with and vanilla cream cheese frosting.</li>
            <li>Chocolate - light and moist chocolate sponge cake layers topped with a choice of chocolate buttercream, milk or dark chocolate ganache.</li>
            <li>Lemon and Raspberry - A lemon sponge filled topped with a lemon glaze</li>
            <li>Salted Caramel Cake - Salted caramel sponge topped with a salted caramel sauce</li>
            <li>Chocolate orange Cake - chocolate orange sponge flavoured naturally with real oranges topped with a luscious chocolate orange ganache</li>
            <li>S’mores - Rich chocolate sponge cake layers topped with chocolate ganache and marshmallow fluff and digestive pieces.</li>
          </ul>
      
      </MenuSection>
      <PricingSection id="pricing">
        
        <h1 style={{ fontFamily: "'Satisfy', cursive" }}>Pricing</h1>
        <p>
          To help you create your own deliciously crafted baked goods choose a size.
          Portion guide (approx guide only, based on coffee sized portions ):</p>
          <ul>
            <li style={{listType:"none"}}>5.75 * 3.25 * 2.5inch |  feeds approx. 5</li>
          <li>8.5 * 4.5 * 2.5inch |  feeds approx. 8</li>
          <li>9 * 5 * 3inch   |  feeds approx. 9</li>
          </ul>
          <h2>Cake Price Guide:</h2>
          <ul>
            <li>6 inch loaf no topping: starting from £10</li>
            <li>6 inch loaf with topping: starting from £15</li>
            <li>8 inch loaf no topping: starting from £15</li>
            <li>8 inch loaf with topping: starting from £20</li>
            <li>9 inch loaf no topping: starting from £20</li>
            <li>9 inch loaf with topping: starting from £25</li>
          </ul>
          
          <h2>Cookie Price Guide:</h2>
          <ul>
            <li>Sugar Cookies/dozen unglazed: starting from £2</li>
            <li>Sugar Cookies/dozen glazed: starting from £5</li>
            <li>Chocolate Chip Cookies/dozen: $3</li>
            <li>Butter Cookies/dozen unglazed: starting from $3</li>
            <li>Butter Cookies/dozen glazed: starting from $5</li>
            <li>Macarons/6pcs: $12</li>
          </ul>

          <h2>Pastry Price Guide:</h2>
          <ul>
            <li>Cinnamon Rolls/3pcs: starting from £3</li>
            <li> Croissants/3pcs: starting from £5</li>
            <li>White Bread/pc: $1</li>
            <li>Whole wheat Bread/pc: $1.50</li>
            <li>Doughnuts/6pcs unglazed: $3</li>
            <li>Doughnuts/6pcs glazed: $4</li>
          </ul>
          <p>Please be advised that these are starting prices and prices vary with cake flavors and topping.
          Some flavors require more ingredients and are more labor intensive which is reflected in pricing. 
        </p>
      </PricingSection>
      <Footer />
    </>
  );
};
export default LandingPage;
