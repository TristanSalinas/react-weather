import { useState } from "react";
import "/src/styles/searchBar.css";

export default function SearchBar(props) {
  const [searchValue, setSearchValue] = useState("Rennes");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          props.search(searchValue);
        }}
      >
        Search
      </button>
    </form>
  );
}
