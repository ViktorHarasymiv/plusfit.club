import React from "react";

import css from "./Style.module.css";

import { FaRegClock } from "react-icons/fa";
import { timeFormatted } from "../../utils/timeFormated";

function CommentList({ data }) {
  return (
    <div className={css.comment_wrapper}>
      {data?.length > 0 ? (
        <div>
          <h2 className={css.comment_title}>Comments: ({data?.length})</h2>
          <ul className={css.comment_list}>
            {data.map(({ userSnapshot, text, createdAt }, i) => {
              return (
                <li key={i}>
                  <img
                    src={userSnapshot.avatar}
                    alt={`${userSnapshot.name} avatar`}
                    className={css.comment_avatar}
                  />
                  <div>
                    <h3 className={css.user_name}>{userSnapshot.name}</h3>
                    <p className={css.time}>
                      <FaRegClock />
                      {timeFormatted(createdAt)}
                    </p>
                    <p>{text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default CommentList;
