import React, { useState } from "react";

import css from "./Style.module.css";
import Lightbox from "../../components/Lightbox/Lightbox";

import ReactPaginate from "react-paginate";

import { LuPlus } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";

function GalleryImage({ data, filter, page, setPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const perPage = 8;

  const filteredImages = data.filter(
    (img) => filter === "Усі" || img.filters.includes(filter)
  );

  const pageCount = Math.ceil(filteredImages.length / perPage);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentImages = filteredImages.slice(startIndex, endIndex);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage);
  };

  return (
    <>
      <div className={css.images_wrapper}>
        <>
          {currentImages.map(({ src, filters }, index) => (
            <div className={css.images_box}>
              <img
                key={index}
                src={src}
                width={300}
                height={300}
                alt={`Фото ${filters} ${index + 1}`}
                className={css.images}
              />
              <div className={css.open_box}>
                <LuPlus onClick={() => openLightbox(index)} />
              </div>
            </div>
          ))}
          {isOpen && (
            <Lightbox
              images={currentImages}
              currentIndex={currentIndex}
              onClose={() => setIsOpen(false)}
              onNavigate={setCurrentIndex}
            />
          )}
        </>
      </div>
      {pageCount > 0 && (
        <ReactPaginate
          className={css.pagination}
          breakLabel="..."
          activeClassName={css.active_pagination}
          nextLabel={<FaArrowRightLong />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          forcePage={page - 1}
          previousLabel={<FaArrowLeftLong />}
          renderOnZeroPageCount={null}
        />
      )}
    </>
  );
}

export default GalleryImage;
