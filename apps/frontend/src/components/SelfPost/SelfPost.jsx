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

  if (!selfPost) return null;

  const { author, likes, commentsCount, title, images, content, quote, tags } =
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
      {/* Paragraph  1 2 */}
      <div>
        {content?.length > 0 && <p className={css.paragraph}>{content[0]}</p>}
        {content?.length > 1 && <p className={css.paragraph}>{content[1]}</p>}
      </div>
      <div className={css.quote_tile}>
        <div className={css.quote_wrapper}>
          <p className={css.quote_text}>{quote.text}</p>
          <div className={css.quote_author}>
            <span className={css.quote_decor}></span>
            <h6 className={css.quote_author}>{quote.author}</h6>
          </div>
        </div>
      </div>
      {/* Paragraph  3 */}
      <div>
        {content?.length > 0 && <p className={css.paragraph}>{content[2]}</p>}
      </div>
      {/* Thumb images */}
      <div className={css.thumb_tile}>
        {images?.length > 1 && <img src={images[0]} alt="Фото поста" />}
        {images?.length > 1 && <img src={images[0]} alt="Фото поста" />}
      </div>
      {/* Paragraph  4 */}
      <div>
        {content?.length > 0 && <p className={css.paragraph}>{content[3]}</p>}
      </div>

      {/* Tags block */}

      <div className={css.tags_tile}>
        <div className={css.tags_wrapper}>
          <h4 className={css.tags_title}>Tags:</h4>
          <ul className={css.tags_list}>
            {tags.map((item, i) => {
              return (
                <li key={i} className={css.tags_item}>
                  #{item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SelfPost;
