import React from "react";

function Buttons({ children, action, ...probs }) {
  return (
    <button
      className="btn-prime"
      style={{ backgroundColor: "blueviolet" }}
      onClick={(e) => action(e)}
      {...probs}
    >
      {children}
    </button>
  );
}

export default Buttons;
