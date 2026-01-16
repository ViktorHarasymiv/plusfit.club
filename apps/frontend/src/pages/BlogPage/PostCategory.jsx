import { Link } from "react-router-dom";
import { useEffect } from "react";

import css from "./Style.module.css";
import TileTitle from "./Components/TileTitle";

import { usePostStore } from "../../store/postStore";

import { FaArrowRightLong } from "react-icons/fa6";

function PostCategory() {
  const { categoryCount, getCategoryCount } = usePostStore();

  useEffect(() => {
    getCategoryCount();
  }, []);

  const categories = [
    "Body Building",
    "GYM & Fitness",
    "Food & Medicine",
    "Cardio",
    "Massage",
    "Yoga",
  ];

  const checkCategory = (category) => {
    const found = categoryCount?.find((c) => c._id === category);
    return found ? found.count : 0;
  };

  return (
    <div className={css.tile_wrapper}>
      <TileTitle title={"Category"} />
      <ul className={css.category_list}>
        {categories.map((item, i) => (
          <li key={i}>
            <Link to={`/blog/category/${item}`}>
              <span>
                <FaArrowRightLong /> {item}
              </span>
              <span>({checkCategory(item)})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostCategory;
