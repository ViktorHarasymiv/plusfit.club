import css from "./Style.module.css";

import { LuCalendar1 } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import Button from "../ui/Button/Button";
import { Link } from "react-router-dom";

function Item({ data }) {
  return data.map(({ _id, images, author, title, description }) => (
    <aside className={css.item}>
      <div className={css.thumb_tile}>
        <img src={images[0]} alt="Thumb" className={css.thumb_img} />
      </div>
      <div className={css.content_block}>
        <div className={css.info_tile}>
          <p>
            <FaRegUserCircle />
            <em>By {author}</em>
          </p>
          <p>
            <LuCalendar1 />
            <em>March 20, 2025</em>
          </p>
        </div>
        <div className={css.text_tile}>
          <h3 className={css.title}>{title}</h3>
          <p className={css.about}>{description}</p>
        </div>
        <Link to={`/blog/${_id}`}>
          <Button>Read More</Button>
        </Link>
      </div>
    </aside>
  ));
}

export default Item;
