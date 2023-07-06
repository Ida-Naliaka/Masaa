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
        show,setShow,
        products,setProducts,
        selectedProducts,setSelectedProducts,
        inputs,setInputs,
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
