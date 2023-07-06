import React from "react";
import {
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProduct } from "../redux/cartRedux";

const Product = ({ item }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addToCart = () => {
    if (cart.products.some(product => product.sku === item.sku)) {
      toast.warning('item already in cart')
    } else {
      dispatch(addProduct({ ...item, "quantity": 1 }));
      toast.success(`${item.name} added to cart`);
    }
  };

  return (
    <div className="flex-1 min-w-[180px] h-[350px] flex flex-col items-center justify-center bg-[#035a77] relative m-[5px]">
      <img className="h-3/6 w-[180px] z-[2] mt-5" src={item.img} alt={item.description} />
      <div className="opacity-0 hover:opacity-100 w-full h-full absolute bg-[rgba(0,0,0,0.2)] z-[3] flex items-center justify-center transition-all duration-[0.5s] ease-[ease] cursor-pointer left-0 top-0">
        <div className="w-10 h-10 bg-[white] flex items-center justify-center transition-all duration-[0.5s] ease-[ease] m-2.5 rounded-[50%] hover:bg-[#e9f5f5] hover:scale-110" onClick={() => addToCart()}>
          <ShoppingCartOutlined />
        </div>
        <div className="w-10 h-10 bg-[white] flex items-center justify-center transition-all duration-[0.5s] ease-[ease] m-2.5 rounded-[50%] hover:bg-[#e9f5f5] hover:scale-110">
          <Link to={`/products/product/${item.sku}`}>
            <SearchOutlined />
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-[black] opacity-40 w-full h-3/6 mt-5 mb-0">
        <p className="text-[15px] text-[#fde8e9] text-center m-0.5" style={{letterSpacing: "2px" }}>
          <b>{item.name}</b>
        </p>
        <p className="text-[15px] text-[#fde8e9] text-center m-0.5">
          <b>{item.color}</b>
        </p>
        <p className="text-[15px] text-[#fde8e9] text-center m-0.5">
          <b>{item.description}</b>
        </p>
        <p className="text-[15px] text-[#fde8e9] text-center m-0.5" style={{ letterSpacing: "2px" }}>
          <b>{item.price}/=</b>
        </p>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Product;
