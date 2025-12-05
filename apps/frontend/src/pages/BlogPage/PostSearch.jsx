import React from "react";

import css from "./Style.module.css";
import TileTitle from "./Components/TileTitle";

function PostSearch() {
  return (
    <div className={css.wrapper_navigation}>
      <div className={css.tile_wrapper}>
        <TileTitle title={"Search"} />
        123
      </div>
      <div className={css.tile_wrapper}>
        <TileTitle title={"Category"} />
        123
      </div>
      <div className={css.tile_wrapper}>
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
      </div>
    </div>
  );
}

export default PostSearch;
