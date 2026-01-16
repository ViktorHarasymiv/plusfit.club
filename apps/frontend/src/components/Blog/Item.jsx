import { Link } from "react-router-dom";

import css from "./Style.module.css";
import { LuCalendar1 } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";

import { timeFormatted } from "../../utils/timeFormated.js";

import Button from "../ui/Button/Button";

function Item({ data }) {
  return data.map(
    (
      { _id, images, title, quote, description, content, createdAt, filterBy },
      i
    ) => (
      <aside key={i} className={css.item}>
        <div className={css.thumb_tile}>
          {filterBy === "news" && <div className={css.news_band}>New</div>}
          <img src={images[0]} alt="Thumb" className={css.thumb_img} />
        </div>
        <div className={css.content_block}>
          <div className={css.info_tile}>
            <p>
              <FaRegUserCircle />
              <em>By {quote.author}</em>
            </p>
            <p>
              <LuCalendar1 />
              <em>{timeFormatted(createdAt)}</em>
            </p>
          </div>
          <div className={css.text_tile}>
            <h3 className={css.title}>{title}</h3>
            <p className={css.about}>
              {description ? description : content[0]}
            </p>
          </div>
          <Link to={`/blog/${_id}`} className={css.link}>
            <Button>Read More</Button>
          </Link>
        </div>
      </aside>
    )
  );
}

export default Item;
