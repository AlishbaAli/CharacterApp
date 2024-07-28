import React from "react";
import "./index.css";

const Attribute = ({ name, value, modifier, updateAttribute }) => {
  const incrementPoints = () => {
    updateAttribute(name, value + 1);
  };

  const decrementPoints = () => {
    if (value > 0) {
      updateAttribute(name, value - 1);
    }
  };

  return (
    <div className="attribute-div">
      <span>
        {name}: {value} (modifier: {modifier})
      </span>
      <div>
        <button onClick={decrementPoints} className="minus-btn">
          -
        </button>
        <button onClick={incrementPoints} className="plus-btn">
          +
        </button>
      </div>
    </div>
  );
};

export default Attribute;
