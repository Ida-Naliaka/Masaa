import React from "react";
import { ProductState } from "./SelectContext";

const Pastry = () => {
  // eslint-disable-next-line
  const {
    error,
    setError,
    //eslint-disable-next-line
    inputs,
    setInputs,
    //eslint-disable-next-line
    quantity,
    setQuantity,
  } = ProductState();

  const handleChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    // eslint-disable-next-line
    switch (param) {
      case "quantity":
        if (isNaN(value) || value === "") {
          setError([...error, 9]);
          setQuantity("")
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setQuantity(value);
          setError(error.filter((e) => e !== 9));
        }
        break;
    }
  };
  return (
    <>
      <div className="description">
        <label>Quantity(CM)</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          placeholder="Product quantity"
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
      </div>
      <div className="info">Please provide number per standard package</div>
      {error.includes(9) && (
        <div className="error">Please, provide the data of indicated type</div>
      )}
    </>
  );
};

export default Pastry;
