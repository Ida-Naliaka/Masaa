import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.scss";
import { ProductState } from "./SelectContext";
import Cake from "./Cake";
import Cakepop from "./Cakepop";
import Pastry from "./Pastries";
import { app } from "../../firebase";
import {
  uploadBytesResumable,
  ref,
  getStorage,
  getDownloadURL,
} from "firebase/storage";

const AddProduct = () => {
  // eslint-disable-next-line
  const {
    products,
    setProducts,
    error,
    setError,
    //eslint-disable-next-line
    selectedProducts,
    setSelectedProducts,
    inputs,
    setInputs,
    sku,
    setSku,
    img, setImg,
    type,
    setType,
    name,
    setName,
    price,
    setPrice,
    size,
    setSize,
    layers,
    setLayers,
    setQuantity,
    quantity,
    diameter,
    setDiameter,
  } = ProductState();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedProducts([]);
    getProducts();
    // eslint-disable-next-line
  }, []);

  const getProducts = () => {
    axios
      .get("http://localhost/reactphp/server/index.php?direct=product")
      .then((response) => {
        setProducts(response.data);
      });
  };
  const typeSetter = {
    Cake: <Cake />,
    Cakepop: <Cakepop />,
    Pastry: <Pastry />,
  };
  const handleChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    // eslint-disable-next-line
    switch (param) {
      case "sku":
        const result = products.find((item) => item.sku === value);
        if (result || value.trim() === "") {
          setError([...error, 1]);
          setSku("");
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setSku(value);
          setError(error.filter((e) => e !== 1));
        }
        break;
      case "name":
        if (value.trim() === "" || !isNaN(value)) {
          setError([...error, 2]);
          setName("")
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setName(value);
          setError(error.filter((e) => e !== 2));
        }
        break;
      case "price":
        if (isNaN(value) || value <= 0) {
          setError([...error, 3]);
          setPrice("")
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setPrice(value);
          setError(error.filter((e) => e !== 3));
        }
        break;
      case "type":
        if (value === "") {
          setError([...error, 4]);
          setType("")
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setType(value);
          setError(error.filter((e) => e !== 4));
        }
        break;
    }
  };
  const handlePic = async (file) => {
    const fileName = new Date().getTime() + name;
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
            setImg(downloadURL);
            setError(error.filter((e) => e !== 10));
             setInputs((values) => ({ ...values, [param]: downloadURL }));
          })
          .catch((err) => {
            console.log(err);
            setError([...error, 10])
            setImg("")
          });
      }
    );
  };

  const reset = () => {
    setType("");
    setName("");
    setPrice("");
    setSku("");
    setSize("");
    setImg("");
    setLayers("");
    setQuantity("");
    setDiameter("");
    setInputs({});
    setError([]);
  };

  const handleSubmit = () => {
    if (
      !name ||
      !sku ||
      !price ||
      !type ||
      !img||
      (!quantity && !diameter && (!size || !layers))
    ) {
      alert("Please, submit required data");
    } else {
      fetch("http://localhost/reactphp/server/index.php?direct=product", {
        method: "post",
        body: JSON.stringify(inputs),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          getProducts();
          navigate("/admin/product/display");
          reset();
        });
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="title">
          <h2>Product Add</h2>
        </div>
        <div className="butttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              reset();
              navigate("/admin/product/display");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <form id="product_form" className="product_form box">
        <div className="description">
          <label>SKU</label>
          <input
            type="text"
            name="sku"
            id="sku"
            placeholder="Product SKU"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        {error.includes(1) && (
          <div className="error">Please, provide unique sku</div>
        )}
        <div className="description">
          <label>Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Product Name"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        {error.includes(2) && (
          <div className="error">
            Please, provide the data of indicated type
          </div>
        )}
        <div className="description">
          <label>Price</label>
          <input
            type="number"
            step=".01"
            min=".01"
            name="price"
            placeholder="Product Price"
            id="price"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        {error.includes(3) && (
          <div className="error">
            Please, provide the data of indicated type
          </div>
        )}
        <div className="description">
          <label>Product Image</label>
        <input
            type="file"
            onChange={(e) => {
              handlePic(e.target.files[0]);
            }}
          />
        </div>
        {error.includes(10) && (
          <div className="error">
            Please, provide the data of indicated type
          </div>
        )}
        <div className="description">
          <label>Type Switcher</label>
          <select
            name="type"
            id="productType"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          >
            <option value="">--Please choose product type--</option>
            <option value="Cake">Cake</option>
            <option value="Cakepop">Cakepop</option>
            <option value="Pastry">Pastry</option>
          </select>
        </div>
        {error.includes(4) && (
          <div className="error">
            Please, provide the data of indicated type
          </div>
        )}
        <div className="box">{typeSetter[type]}</div>
      </form>
    </>
  );
};

export default AddProduct;