import React from "react";

const Search = ({ placeholder, className, onChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className={className}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
