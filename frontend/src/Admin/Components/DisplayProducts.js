import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductState } from "./SelectContext";
import { Person } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DisplayProducts = () => {
  const {
    selectedProducts,
    setSelectedProducts,
    show,
    setShow,
    products,
    setProducts,
  } = ProductState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const allElements = document.querySelectorAll(".delete-checkbox");

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    show
      ? [].forEach.call(allElements, (el) => {
          el.style.display = "block";
        })
      : [].forEach.call(allElements, (el) => {
          el.style.display = "none";
        });
    // eslint-disable-next-line
  }, [show]);

  const getProducts = () => {
    axios
      .get(
        "https://masaawatches.000webhostapp.com/server/index.php?direct=product"
      )
      .then((response) => {
        setProducts(response.data);
      });
  };
  const handleClick = (item) => {
    document.querySelector(`#sku-${item}`).checked
      ? setSelectedProducts([...selectedProducts, item])
      : setSelectedProducts(selectedProducts.filter((i) => i !== item));
  };

  const handleDelete = () => {
    selectedProducts.map((prod) =>
      fetch(
        "https://masaawatches.000webhostapp.com/server/index.php?direct=product",
        {
          method: "post",
          body: JSON.stringify({ sku: prod }),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          getProducts();
          data.status === 1 &&
            setSelectedProducts(
              selectedProducts.filter((item) => item !== prod)
            );
        })
    );
  };
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleDeleteProfile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios
      .delete(
        `https://masaawatches.000webhostapp.com/server/index.php?direct=user?userid=${user.userid}`,
        config
      )
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
       toast.error(error);
      });
  };
  return (
    <>
      <div className="flex justify-around items-center w-full h-[100px] bg-[#795c5f] mb-10 px-[auto] py-2.5 border-b-[black] border-b border-solid top-0">
        <div className="title text-[white]">
          <h2>ProductList</h2>
        </div>
        <div className="flex justify-between items-center w-[30%]">
          <button
            className="bg-[darken(#795c5f,10)] text-[white] cursor-pointer m-2.5 p-2.5"
            onClick={() => navigate("/admin/product/add")}
          >
            ADD
          </button>
          <button
            className="bg-[darken(#795c5f,10)] text-[white] cursor-pointer m-2.5 p-2.5"
            onClick={() => {
              setShow(false);
              handleDelete();
            }}
          >
            MASS DELETE
          </button>
          {user && 
            <div className="md:text-xl text-base cursor-pointer text-black md:ml-6 ml-2">
              <Person
                data-tip
                data-tooltip-id="logoutTip"
                data-event="click"
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "white",
                }}
              />
              <ReactTooltip
                id="logoutTip"
                place="bottom"
                effect="solid"
                clickable={true}
              >
                <span
                  className="bg-white text-black text-center h-fit rounded-lg md:text-xl text-base cursor-pointer w-full p-2 m-2 flex justify-center"
                  onClick={() => handleLogOut()}
                >
                  Logout
                </span>
                <span
                  className="bg-white text-black text-center h-fit rounded-lg md:text-xl text-base cursor-pointer w-full p-2 m-2 flex justify-center"
                  onClick={() => handleDeleteProfile()}
                >
                  Delete
                </span>
              </ReactTooltip>
            </div>
            }
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,auto))] gap-2.5 auto-rows-[repeat(auto-fit,minmax(50px,auto))] max-w-full m-2.5 p-2.5">
        {products.map((item) => (
          <label
            className="flex justify-around bg-[#795c5f] cursor-pointer border m-[5px] p-2.5 border-solid border-[lightgray] hover:bg-[darken(#f5deb2,10)]"
            key={item.sku}
          >
            <div className="flex items-start float-left mt-2.5">
              <input
                type="checkbox"
                className="relative delete-checkbox"
                id={`sku-${item.sku}`}
                onClick={() => {
                  setShow(true);
                  handleClick(item.sku);
                }}
              />
              <div className="normal-case text-[white] text-[15px] text-center min-h-[127px] cursor-pointer block relative mx-auto my-0 p-2.5">
                <h5>{item.sku} </h5>
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{item.value}</p>
              </div>
            </div>
          </label>
        ))}
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
    </>
  );
};

export default DisplayProducts;
