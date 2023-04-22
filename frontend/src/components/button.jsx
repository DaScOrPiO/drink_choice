import React from "react";

export default function Button({ btnText, click, style }) {
  return (
    <button
      onClick={click}
      style={style}
      className="bg-gray-800 p-2 rounded-lg text-white hover:bg-gray-600 cursor-pointer"
    >
      {btnText}
    </button>
  );
}
