import React from "react";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  return (
    <div className="flex md:flex-row flex-col md:p-[5px] p-0 md:mt-auto mt-[5px] justify-between mb-11">
      {categories.map((item) => (
        <CategoryItem item={item} key={item.productid} />
      ))}
    </div>
  );
};

export default Categories;
