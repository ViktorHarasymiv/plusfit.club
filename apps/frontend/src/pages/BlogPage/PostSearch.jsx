import React, { useEffect, useState } from "react";
import axios from "axios";

import css from "./Style.module.css";
import TileTitle from "./Components/TileTitle";

import { IoSearchOutline } from "react-icons/io5";

import { API_URL } from "../../config/api";
import { Link } from "react-router-dom";

function PostSearch() {
  const [query, setQuery] = useState("");
  const [result, setResults] = useState([]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
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

  return (
    <div className={css.tile_wrapper}>
      <TileTitle title={"Search"} />
      <form onSubmit={(e) => handleSearch(e)} className={css.search_form}>
        <input
          type="search"
          value={query}
          className="input blog_input"
          placeholder="Search Here..."
          onChange={(e) => handleSearch(e)}
        />
        <button type="submit" className={css.search_submit}>
          <IoSearchOutline />
        </button>
      </form>
      {query.length > 0 && result.length > 0 && (
        <div className={css.result_tile}>
          {result.map(({ title, images, _id }) => (
            <div className={css.result_tile_wrapper}>
              <img
                src={images[0]}
                alt="Post image"
                width={84}
                height={84}
                className={css.thumb_image}
              />
              <div>
                <Link to={`/blog/${_id}`} className={css.title_link}>
                  {title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostSearch;
