import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useCommentStore } from "../../../../../store/commentPostStore";
import { useAuth } from "../../../../../context/AuthContext";
import Loader from "../../../../../components/ui/Loader/Loader";

import Button from "../../../../../components/ui/Button/Button";
import ReverseBtn from "../../../../../components/ui/Button/ReverseBtn";

import { FaRegClock } from "react-icons/fa";
import { timeFormatted } from "../../../../../utils/timeFormated";

import css from "./Style.module.css";

function MyReviews() {
  const { user } = useAuth();
  const { getCommentsByUser, deleteComment, userComment } = useCommentStore();

  const [refetch, getRefetch] = useState(false);

  useEffect(() => {
    const getCommentById = () => {
      getCommentsByUser(user._id);
    };

    getCommentById();
  }, [refetch]);

  const deleteUserComment = async (id) => {
    await deleteComment(id);
    getRefetch((prev) => !prev);
  };

  const variable = true;

  if (!userComment) return <Loader />;

  console.log(userComment);

  return (
    <>
      {userComment.length < 1 ? (
        <div>
          <h2>You have not any comments</h2>
        </div>
      ) : (
        <ul className={css.comment_list}>
          {userComment.map(({ _id, postId, userSnapshot, createdAt, text }) => (
            <li key={_id} className={css.flex_comment}>
              <div className={css.flex_user_tile}>
                <div>
                  <img
                    src={userSnapshot.avatar}
                    alt={`${userSnapshot.name} avatar`}
                    className={css.comment_avatar}
                  />
                  <div>
                    <h3 className={css.user_name}>{userSnapshot.name}</h3>
                    <p className={css.time}>
                      <FaRegClock />
                      {timeFormatted(createdAt, variable)}
                    </p>
                  </div>
                </div>
                <div className={css.text_wrapper}>
                  <p>{text}</p>
                </div>
              </div>
              <div className={css.action_wrapper}>
                <Button>
                  <Link to={`/blog/${postId}`}>Show post</Link>
                </Button>
                <ReverseBtn action={() => deleteUserComment(_id)}>
                  Delete
                </ReverseBtn>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MyReviews;
