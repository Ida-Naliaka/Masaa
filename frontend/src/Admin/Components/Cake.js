import React from "react";
import { ProductState } from "./SelectContext";

const Cake = () => {
  // eslint-disable-next-line
  const { error, setError, inputs, setInputs, size, setSize, layers, setLayers } =
    ProductState();

  const handleChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    // eslint-disable-next-line
    switch (param) {
      case "size":
        if (isNaN(value) || value === "") {
          setError([...error, 6]);
          setSize("")
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setSize(value);
          setError(error.filter((e) => e !== 6));
        }
        break;
      case "layers":
        if (isNaN(value) || value === "") {
          setError([...error, 6]);
          setLayers("")
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setLayers(value);
          setError(error.filter((e) => e !== 6));
        }
        break;
    }
  };
  return (
    <>
      <div className="description">
        <label>Size(inches)</label>
        <input
          type="number"
          name="size"
          id="size"
          placeholder="cake Size"
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
      </div>
      <div className="info">Please provide cake size in inches</div>
      {error.includes(7) && (
        <div className="error">Please, provide the data of indicated type</div>
      )}
      <div className="description">
        <label>Layers</label>
        <input
          type="number"
          name="layers"
          id="layers"
          placeholder="cake layers"
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
      </div>
      <div className="info">Please provide number of cake layers</div>
      {error.includes(6) && (
        <div className="error">Please, provide the data of indicated type</div>
      )}
    </>
  );
};

export default Cake;
