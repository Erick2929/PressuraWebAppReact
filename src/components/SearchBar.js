import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Buscar" />
      <div className="icon-search"></div>
      <div className="add">
        <p>+</p>
      </div>
    </div>
  );
};

export default SearchBar;
