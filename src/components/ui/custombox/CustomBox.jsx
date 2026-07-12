import React from "react";

const CustomBox = ({ children, className }) => {
  return (
    <div
      className={`${className} bg-white border-2 border-[#DC2626]/20 rounded-2xl p-4`}
    >
      {children}
    </div>
  );
};

export default CustomBox;
