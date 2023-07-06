import React from "react";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import Slider from "../Components/Slider";
import ShopNavbar from "../Components/ShopNavbar";

const Home = () => {
  return (
    <div className="w-full overflow-hidden relative">
      <ShopNavbar />
      <Slider />
      <Categories />
      <div className="sticky bottom-0 w-full">
      <Footer />
      </div>
    </div>
  );
};

export default Home;
