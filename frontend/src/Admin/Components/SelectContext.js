import React, { useState, createContext, useContext } from "react";

const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const [employeeid, setEmployeeid] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [layers, setLayers] = useState("");
  const [diameter, setDiameter] = useState("");
  const [quantity, setQuantity] = useState("");
  const [img, setImg] = useState("");
  const [inputs, setInputs] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [show, setShow] = useState(true);
  const [error, setError] = useState([]);

  return (
    <ProductContext.Provider
      value={{
        employeeid, setEmployeeid,
        username, setUsername,
        email, setEmail,
        password, setPassword,
        city, setCity,
        phone, setPhone,
        status, setStatus,
        layers, setLayers,
        img, setImg,
        diameter, setDiameter,
        quantity, setQuantity,
        show,setShow,
        products,setProducts,
        selectedProducts,setSelectedProducts,
        inputs,setInputs,
        type,setType,
        name,setName,
        price,setPrice,
        size, setSize,
        sku, setSku,
        error,setError,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const ProductState = () => {
  return useContext(ProductContext);
};
export default ProductProvider;
