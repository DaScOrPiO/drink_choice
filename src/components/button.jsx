import React from "react";

export default function Button({ btnText, click, style }) {
  return (
    <button onClick={click} style={style} className="bg-red-500 p-2 rounded-lg">
      {btnText}
    </button>
  );
}
