import { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({onClickSearch}) => {
  const [searchString, setSearchString] = useState("");

  const changeSearch = (e) => {
    setSearchString(e.target.value);
  }

  return (
    <div className="search-bar">
      <input type="text" placeholder="Buscar" value={searchString} onChange={changeSearch} />
      <div className="icon-search" onClick={() => onClickSearch(searchString.trim().toLowerCase())}></div>
      <div className="add">
        <p>+</p>
      </div>
    </div>
  );
};

export default SearchBar;
