import React from "react";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import PopularProducts from "../Components/PopularProducts";
import Slider from "../Components/Slider";
import SearchBar from "../Components/SearchBar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <Categories />
      <SearchBar />
      {/*<PopularProducts />*/}
      <Footer />
    </div>
  );
};

export default Home;
