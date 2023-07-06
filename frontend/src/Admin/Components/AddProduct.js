import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductState } from "./SelectContext";
import { app } from "../../firebase";
import {
  uploadBytesResumable,
  ref,
  getStorage,
  getDownloadURL,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const {
    products,
    setProducts,
    error,
    setError,
    selectedProducts,
    setSelectedProducts,
    inputs,
    setInputs,
  } = ProductState();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedProducts([]);
    getProducts();
    // eslint-disable-next-line
  }, []);

  const getProducts = () => {
    axios
      .get(
        "http://localhost/ecommerce/php-react-website-store/server/index.php?direct=product"
      )
      .then((response) => {
        setProducts(response.data);
      });
  };
  const handleChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    // eslint-disable-next-line
    switch (param) {
      case "sku":
        //const result = false // products? products.find((item) => item.sku === value):false
        if (value.trim() === "") {
          setError([...error, "sku"]);
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setError(error.filter((e) => e !== "sku"));
        }
        break;
      case "name":
        if (value.trim() === "" || !isNaN(value)) {
          setError([...error, "name"]);
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setError(error.filter((e) => e !== "name"));
        }
        break;
      case "price":
        if (isNaN(value) || value <= 0) {
          setError([...error, "price"]);
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setError(error.filter((e) => e !== "price"));
        }
        break;
      case "category":
        if (value === "") {
          setError([...error, "category"]);
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setError(error.filter((e) => e !== "category"));
        }
        break;
      case "color":
        if (value === "") {
          setError([...error, "color"]);
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setError(error.filter((e) => e !== "color"));
        }
        break;
      case "description":
        if (value === "") {
          setError([...error, "description"]);
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setError(error.filter((e) => e !== "description"));
        }
        break;
    }
  };
  const handlePic = async (file) => {
    const fileName = new Date().getTime() + inputs.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const param = "img";

    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setError(error.filter((e) => e !== "image"));
            setInputs((values) => ({ ...values, [param]: downloadURL }));
          })
          .catch((err) => {
            console.log(err);
            setError([...error, "image"]);
          });
      }
    );
  };

  const reset = () => {
    setInputs({});
    setError([]);
    document.getElementById("product_form").reset();
  };

  const handleSubmit = async () => {
    console.log(inputs);
    if (
      "name" in inputs &&
      "sku" in inputs &&
      "price" in inputs &&
      "category" in inputs &&
      "img" in inputs &&
      "color" in inputs &&
      "description" in inputs
    ) {
      await axios
        .post(
          "http://localhost/ecommerce/php-react-website-store/server/index.php?direct=product",
          inputs
        )
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.message);
            getProducts();
            reset();
          } else {
            toast.error(res.data.message);
          }
        });
    } else {
      toast.error("Please, submit required data");
    }
  };

  return (
    <>
      <div className="flex justify-around items-center w-full h-[100px] bg-[#795c5f] mb-10 px-[auto] py-2.5 border-b-[black] border-b border-solid top-0">
        <div className="title">
          <h2>Product Add</h2>
        </div>
        <div className="flex justify-between items-center w-[30%]">
          <button
            className="bg-[darken(#795c5f,10)] text-[black] cursor-pointer m-2.5 p-2.5"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Save
          </button>
          <button
            className="bg-[darken(#795c5f,10)] text-[black] cursor-pointer m-2.5 p-2.5"
            onClick={() => {
              reset();
              navigate("/admin/product/display");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <form
        id="product_form"
        className="product_form flex flex-col items-center justify-center w-[97%] h-4/5 text-xl bg-[#795c5f] mx-auto my-0 p-2.5"
      >
        <div className="flex justify-between items-center p-[5px]">
          <label className="m-[5px]">SKU</label>
          <input
            className="flex w-[70%] text-[15px] text-center box-border bg-neutral-100 m-[5px] p-2.5 border-0"
            type="text"
            name="sku"
            placeholder="Product SKU"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        {error.includes("sku") && (
          <div className="text-[red] text-[15px]">
            Please, provide unique sku
          </div>
        )}
        <div className="flex justify-between items-center p-[5px]">
          <label className="m-[5px]">Name</label>
          <input
            className="flex w-[70%] text-[15px] text-center box-border bg-neutral-100 m-[5px] p-2.5 border-0"
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        {error.includes("name") && (
          <div className="text-[red] text-[15px]">
            Please, provide product name
          </div>
        )}
        <div className="flex justify-between items-center p-[5px]">
          <label className="m-[5px]">Price</label>
          <input
            className="flex w-[70%] text-[15px] text-center box-border bg-neutral-100 m-[5px] p-2.5 border-0"
            type="number"
            step=".01"
            min=".01"
            name="price"
            placeholder="Product Price"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        {error.includes("price") && (
          <div className="text-[red] text-[15px]">
            Please, provide product price
          </div>
        )}
        <div className="flex justify-between items-center p-[5px]">
          <label className="m-[5px]">Product Image</label>
          <input
            className="flex w-[70%] text-[15px] text-center box-border bg-neutral-100 m-[5px] p-2.5 border-0"
            type="file"
            onChange={(e) => {
              handlePic(e.target.files[0]);
            }}
          />
        </div>
        {error.includes("image") && (
          <div className="text-[red] text-[15px]">Please, attach image</div>
        )}
        <div className="flex justify-between items-center p-[5px]">
          <label className="m-[5px]">Category Switcher</label>
          <select
            className="flex w-[70%] text-[15px] text-center box-border bg-neutral-100 m-[5px] p-2.5 border-0"
            name="category"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          >
            <option value="">--Please choose product category--</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Jewellery">Jewellery</option>
            <option value="Kiddies">Kiddies</option>
          </select>
        </div>
        {error.includes("category") && (
          <div className="text-[red] text-[15px]">
            Please, select product category
          </div>
        )}
        <div className="flex justify-between items-center p-[5px]">
          <label className="m-[5px]">Color</label>
          <input
            className="flex w-[70%] text-[15px] text-center box-border bg-neutral-100 m-[5px] p-2.5 border-0"
            type="text"
            name="color"
            placeholder="color eg black"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        {error.includes("color") && (
          <div className="text-[red] text-[15px]">
            Please, provide the product's color
          </div>
        )}
        <div className="flex justify-between items-center p-[5px]">
          <label className="m-[5px]">Description</label>
          <input
            className="flex w-[70%] text-[15px] text-center box-border bg-neutral-100 m-[5px] p-2.5 border-0"
            type="text"
            name="description"
            placeholder="product description"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        {error.includes("description") && (
          <div className="text-[red] text-[15px]">
            Please, provide product description
          </div>
        )}
      </form>
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

export default AddProduct;
