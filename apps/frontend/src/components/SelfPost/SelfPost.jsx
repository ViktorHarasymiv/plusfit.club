import React, { useEffect } from "react";

import css from "./Style.module.css";
import { usePostStore } from "../../store/postStore";

import { FaRegUser } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { GrLike } from "react-icons/gr";
import { BsShare } from "react-icons/bs";

function SelfPost({ id }) {
  const { getPostById, selfPost } = usePostStore();

  useEffect(() => {
    getPostById(id);
  }, []);

  const { author, likes, commentsCount, title, images, content, quote } =
    selfPost;

  return (
    <div className={css.wrapper}>
      {images?.length > 0 && <img src={images[1]} alt="Фото поста" />}
      <div className={css.navigation_wrapper}>
        <div className={css.first_tile}>
          <div className={css.tile}>
            <FaRegUser />
            {author}
          </div>
          <div className={css.tile}>
            <FaRegMessage />
            {commentsCount} Comments
          </div>
          <div className={css.tile}>
            <GrLike />
            {likes} Like
          </div>
        </div>
        <div className={css.tile}>
          <BsShare /> Share
        </div>
      </div>
      <h3 className={css.blog_title}>{title}</h3>
      <div>
        {content?.length > 0 && <p>{content[0]}</p>}
        {content?.length > 1 && <p>{content[1]}</p>}
      </div>
    </div>
  );
}

export default SelfPost;
