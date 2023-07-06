import React from "react";
import ShopNavbar from "../Components/ShopNavbar";
import Products from "../Components/Products";
import Footer from "../Components/Footer";
import { useState } from "react";


const AllProducts = () => {
  const [sort, setSort] = useState("newest");
  const [cat, setCat] = useState("");
  return (
    <>
      <ShopNavbar />
      <div className="flex flex-col items-center md:mt-[10%] mt-[20%] p-2.5">
        <h1 className="m-2.5 p-2.5">All Products</h1>
        <div className="flex">
        <div className="flex justify-between">
          <div className="m-5 flex flex-col">
            <span className="text-xl font-semibold md:mr-5 mr-0">Sort Products:</span>
            <select className="md:mx-0 md:my-2.5 mx-3 my-0 p-2.5" onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="asc">Price (asc)</option>
              <option value="desc">Price (desc)</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="m-5 flex flex-col">
            <span className="text-xl font-semibold md:mr-5 mr-0">Sort by Category:</span>
            <select className="  md:mx-0 md:my-2.5 mx-5 my-0 p-2.5" onChange={(e) => setCat(e.target.value)}>
              <option value="">All Products</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Jewellery">Jewellery</option>
              <option value="Kiddies">Kiddies</option>
            </select>
          </div>
          </div>
          </div>
        <Products cat={cat} sort={sort} />
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
