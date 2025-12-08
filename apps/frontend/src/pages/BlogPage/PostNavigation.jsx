import React from "react";

import css from "./Style.module.css";

import PostSearch from "./PostSearch";
import PostCategory from "./PostCategory";

function PostNavigation() {
  return (
    <div className={css.wrapper_navigation}>
      <PostSearch />
      <PostCategory />
      {/* <div className={css.tile_wrapper}>
        <TileTitle title={"Recent Post"} />
        123
      </div>
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
