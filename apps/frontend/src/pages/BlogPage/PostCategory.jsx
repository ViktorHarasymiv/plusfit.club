import { Link } from "react-router-dom";
import { useEffect } from "react";

import css from "./Style.module.css";
import TileTitle from "./Components/TileTitle";

import { usePostStore } from "../../store/postStore";

import { FaArrowRightLong } from "react-icons/fa6";
import { useEmotionsStore } from "../../store/emotionStore";

function PostCategory() {
  const { categoryCount, getCategoryCount } = usePostStore();
  const { categories } = useEmotionsStore();

  useEffect(() => {
    getCategoryCount();
  }, []);

  const checkCategory = (category) => {
    const found = categoryCount?.find((c) => c._id === category);
    return found ? found.count : 0;
  };

  return (
    <div className={css.tile_wrapper}>
      <TileTitle title={"Category"} />
      <ul className={css.category_list}>
        {categories.map(({ _id, title }) => (
          <li key={_id}>
            <Link to={`/blog/category/${title}`}>
              <span>
                <FaArrowRightLong /> {title}
              </span>
              <span>({checkCategory(title)})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostCategory;
