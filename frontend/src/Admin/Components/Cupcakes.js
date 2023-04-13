import React from "react";
import { ProductState } from "./SelectContext";

const Cupcakes = () => {
  // eslint-disable-next-line
  const { error, setError, inputs, setInputs, quantity, setQuantity} =
    ProductState();

  const handleChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    // eslint-disable-next-line
    switch (param) {
      case "quantity":
        if (isNaN(value) || value === "") {
          setError([...error, 6]);
          setQuantity("")
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setQuantity(value);
          setError(error.filter((e) => e !== 6));
        }
        break;
    }
  };
  return (
    <>
      <div className="description">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          placeholder="minimum order quantity"
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
      </div>
      <div className="info">Please provide minimum order quantity</div>
      {error.includes(7) && (
        <div className="error">Please, provide the minimum order quantity</div>
      )}
    </>
  );
};

export default Cupcakes;
