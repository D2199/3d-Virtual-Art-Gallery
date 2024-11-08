import React, { useState } from "react";
import Buttons from "../utils/Buttons";

function Search({ setSearch }) {
  const [query, setQuery] = useState("");
  return (
    <div className="search-con" style={{ display: "flex" }}>
      <input
        placeholder="search"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <span>
        <Buttons
          action={(e) => {
            setSearch(query);
          }}
        >
          search
        </Buttons>
      </span>
    </div>
  );
}

export default Search;
