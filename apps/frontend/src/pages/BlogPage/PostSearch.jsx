import React, { useEffect, useState } from "react";
import axios from "axios";

import css from "./Style.module.css";
import TileTitle from "./Components/TileTitle";

import { IoSearchOutline } from "react-icons/io5";

import { API_URL } from "../../config/api";

function PostSearch() {
  const [query, setQuery] = useState("");
  const [result, setResults] = useState([]);

  const handleSearch = async (e) => {
    4;
    e.preventDefault();
    if (!query) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/posts/search`, {
        params: { query },
      });

      setResults(res.data);
    } catch (error) {
      console.error("Помилка пошуку:", error);
    }
  };

  console.log(result);

  // useEffect(() => {
  //   handleSearch();
  // }, [query]);

  return (
    <div className={css.tile_wrapper}>
      <TileTitle title={"Search"} />
      <form onSubmit={handleSearch} className={css.search_form}>
        <input
          type="search"
          value={query}
          className="input blog_input"
          placeholder="Search Here..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className={css.search_submit}>
          <IoSearchOutline />
        </button>
      </form>
    </div>
  );
}

export default PostSearch;
