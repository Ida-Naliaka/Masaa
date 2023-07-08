import React from "react";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import ShopNavbar from "../Components/ShopNavbar";
import Popular from "../Components/Popular";

const Home = () => {
  return (
    <div className="w-full overflow-hidden relative">
      <ShopNavbar />
      <div className="my-5">
      <Categories />
      <Popular />
      </div>
      <div className="sticky bottom-0 w-full">
      <Footer />
      </div>
    </div>
  );
};

export default Home;
