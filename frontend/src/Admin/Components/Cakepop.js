import React from "react";
import { ProductState } from "./SelectContext";

const Cakepop = () => {
  // eslint-disable-next-line
  const { error, setError, inputs, setInputs, diameter, setDiameter } = ProductState();

  const handleChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    // eslint-disable-next-line
    switch (param) {
      case "diameter":
        if (isNaN(value) || value === "") {
          setError([...error, 8]);
          setDiameter("")
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setDiameter(value);
          setError(error.filter((e) => e !== 8));
        }
        break;
    }
  };
  return (
    <>
      <div className="description">
        <label>Diameter(cm)</label>
        <input
          type="number"
          name="diameter"
          id="diameter"
          placeholder="Cakepop diameter"
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
      </div>
      <div className="info">Please provide diameter in centimeters</div>
      {error.includes(8) && (
        <div className="error">Please, provide the data of indicated type</div>
      )}
    </>
  );
};

export default Cakepop;
