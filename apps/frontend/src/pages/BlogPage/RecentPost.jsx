import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePostStore } from "../../store/postStore";

import TileTitle from "./Components/TileTitle";

import css from "./Style.module.css";

import { IoMdTime } from "react-icons/io";

import { timeFormatted } from "../../utils/timeFormated";

function RecentPost() {
  const { getRecentByLikes, recentPost } = usePostStore();

  useEffect(() => {
    getRecentByLikes();
  }, []);

  return (
    <div className={css.tile_wrapper}>
      <TileTitle title={"Recent Post"} />
      <ul className={css.recent_list}>
        {recentPost?.map((post) => (
          <li key={post._id}>
            <Link to={`/blog/${post._id}`}>
              <div className={css.recent_content_wrapper}>
                <img
                  src={post.images[0]}
                  alt={post._id}
                  width={84}
                  height={84}
                  className={css.images}
                />
                <div className={css.content_wrapp}>
                  <h2 className={css.title}>{post.title}</h2>
                  <div className={css.info_wrapper}>
                    <p className={css.date}>
                      <IoMdTime />
                      {timeFormatted(post.createdAt)}
                    </p>
                    <p>({post.likes} likes)</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentPost;
