import React from "react";
import ReactPaginate from "react-paginate";

import css from "./Style.module.css";

import { FaRegClock } from "react-icons/fa";
import { timeFormatted } from "../../utils/timeFormated";

import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";

function CommentList({ data, pagination, setPage }) {
  console.log(pagination);

  const { currentPage, totalPages } = pagination;

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage);
  };

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
                    <p className={css.comment_text}>{text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <ReactPaginate
            className={css.pagination}
            breakLabel="..."
            activeClassName={css.active_pagination}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            forcePage={currentPage - 1}
            nextLabel={<FaArrowRightLong />}
            previousLabel={<FaArrowLeftLong />}
            renderOnZeroPageCount={null}
          />
        </div>
      ) : null}
    </div>
  );
}

export default CommentList;
