import React from "react";

import css from "./Style.module.css";
import TileTitle from "./Components/TileTitle";

function PostCategory() {
  return (
    <div className={css.tile_wrapper}>
      <TileTitle title={"Category"} />
      123
    </div>
  );
}

export default PostCategory;
