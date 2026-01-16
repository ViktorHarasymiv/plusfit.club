import React from "react";

import css from "./Style.module.css";

import PostSearch from "./PostSearch";
import PostCategory from "./PostCategory";
import RecentPost from "./RecentPost";

function PostNavigation({ query, setQuery }) {
  return (
    <div className={css.wrapper_navigation}>
      <PostSearch query={query} setQuery={setQuery} />
      <PostCategory />

      <RecentPost />
      {/*
      <div className={css.tile_wrapper}>
        <TileTitle title={"Follow Us"} />
        123
      </div>
      <div className={css.tile_wrapper}>
        <TileTitle title={"Popular Tags"} />
        123
      </div> */}
    </div>
  );
}

export default PostNavigation;
