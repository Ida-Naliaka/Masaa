import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ item }) => {
  return (
    <div className="m-1 flex-1 h-[70vh] relative">
      <Link to={`/products/${item.cat}`}>
        <img
          src={item.img}
          className="w-full  md:h-full h-[20vh] object-cover "
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <div className="p-[2px] mb-1 bg-white font-semibold opacity-80">
            <h1 className="text-[#e97451] mb-5">{item.name}</h1>
          </div>
          <button className="p-2 bg-white text-gray-600 cursor-pointer font-semibold md:mb-0 mb-1">
            SHOP NOW
          </button>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
