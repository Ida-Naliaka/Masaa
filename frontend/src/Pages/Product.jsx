import React from "react";
import { Add, Remove } from "@material-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ShopNavbar from "../Components/ShopNavbar";

const Product = () => {
  const location = useLocation();
  const sku = location.pathname.split("/")[3];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getProduct = () => {
      try {
        axios
          .get(
            "https://masaawatches.000webhostapp.com/server/index.php?direct=product"
          )
          .then((res) => {
            const allprod = res.data;
            allprod.map((prod) => prod.sku === sku && setProduct(prod));
          });
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [sku]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    if (user) {
      dispatch(addProduct({ ...product, quantity }));
      toast.success(`${product.name} added to cart`);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <ShopNavbar />
      <Announcement str="It's time" />
      <div
        className="md:p-12 p-2 mt-12 mb-2 ml-[15%] mr-[12%] w-[70%] h-fit flex md:flex-row flex-col items-center justify-center"
        style={{ border: "1px solid black" }}
      >
        <div className="m-1 flex-1 h-[50vh]">
          <img
            className="md:h-full h-[40vh] w-[70%] object-cover"
            src={product.img}
            alt={product.name}
          />
        </div>
        <div className="flex-1 md:px-0 md:py-12 px-2 py-2 ">
          <h1 className="font-thin">{product.name}</h1>
          <p className="mx-5 text-2xl ">{product.value}</p>
          <span className="font-hairline text-4xl">$ {product.price}</span>
          <div className="md:w-6/12 w-full flex items-center justify-between">
            <div className="flex items-center font-bold">
              <Remove onClick={() => handleQuantity("dec")} />
              <span
                className="w-8 h-8 flex items-center justify-center rounded-md"
                style={{ border: "2px solid teal" }}
              >
                {quantity}
              </span>
              <Add onClick={() => handleQuantity("inc")} />
            </div>
            <button
              className="p-4 bg-white hover:bg-[#f8f4f4] cursor-pointer font-medium"
              style={{ border: "2px solid teal" }}
              onClick={() => handleClick()}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <Footer />
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
