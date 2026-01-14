import React, { useEffect, useRef, useState } from "react";

import css from "./Style.module.css";
import { usePostStore } from "../../store/postStore";

import { FaRegUser } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { GrLike } from "react-icons/gr";
import { BsShare } from "react-icons/bs";
import CommentFormPost from "./CommentFormPost";
import { useAuth } from "../../context/AuthContext";
import { useAuthModalStore } from "../../store/useAuthModalStore";
import CommentList from "./CommentList";
import axios from "axios";
import { API_URL } from "../../config/api";
import { useCommentStore } from "../../store/commentPostStore";

function SelfPost({ id }) {
  // STATE
  const [page, setPage] = useState(1);

  //  STORE
  const { user } = useAuth();
  const { openSignIn } = useAuthModalStore();
  const { getPostById, selfPost } = usePostStore();
  const { getCommentPost, data, pagination } = useCommentStore();

  const [isLike, setIsLike] = useState(false);
  const [commentScroll, setCommentScroll] = useState();

  const commentListRef = useRef(null);

  const scrollToComponent = (toWhat) => {
    if (toWhat) {
      const rect = toWhat.getBoundingClientRect();

      const offset = window.pageYOffset + rect.top - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    getPostById(id);
    getCommentPost(id, page);

    if (commentListRef.current) {
      setCommentScroll(commentListRef.current);
    }
  }, [id, page, isLike]);

  const handleLike = async (postId, userId) => {
    const { data } = await axios.patch(`${API_URL}/posts/${postId}/like`, {
      userId,
    });
    setIsLike((prev) => !prev);
    return data;
  };

  function ShareButton({ post }) {
    const handleShare = async () => {
      if (navigator.share) {
        try {
          console.log(post);

          await navigator.share({
            title: post.title,
            text: post.text,
            url: window.location.href,
          });
          console.log("Post shared successfully");
        } catch (error) {
          console.error("Error sharing:", error);
        }
      } else {
        // fallback: копіювати лінк
        navigator.clipboard.writeText(window.location.href);
        alert("Лінк скопійовано!");
      }
    };

    return (
      <div className={css.tile} onClick={handleShare}>
        <BsShare /> Share
      </div>
    );
  }

  if (!selfPost) return null;

  const { author, likes, title, images, content, quote, tags } = selfPost;

  return (
    <div className={css.wrapper}>
      {images?.length > 0 && <img src={images[1]} alt="Фото поста" />}
      <div className={css.navigation_wrapper}>
        <div className={css.first_tile}>
          <div className={css.tile}>
            <FaRegUser />
            {author}
          </div>
          <div
            className={css.tile}
            onClick={() => scrollToComponent(commentScroll)}
          >
            <FaRegMessage />
            {pagination.totalItems} Comments
          </div>
          <div className={css.tile}>
            <GrLike onClick={() => handleLike(id, user._id)} />
            {likes} Like
          </div>
        </div>
        <div className={css.tile}>
          <ShareButton post={selfPost} />
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

      {/* Comment list  */}

      <div ref={commentListRef}>
        <CommentList
          data={data}
          pagination={pagination}
          setPage={setPage}
          commentScroll={commentScroll}
          scrollToComments={scrollToComponent}
        />
      </div>

      {/* Comment Form Post  */}
      {user ? (
        <CommentFormPost postId={id} fetchNewComment={getCommentPost} />
      ) : (
        <div className={css.navigation}>
          To leave a comment, you must be{" "}
          <span onClick={openSignIn} className={css.sign_in_link}>
            logged in.
          </span>
        </div>
      )}
    </div>
  );
}

export default SelfPost;
