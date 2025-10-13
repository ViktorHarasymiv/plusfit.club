import React, { useState, useRef, useEffect } from "react";

import css from "./Style.module.css";
import Lightbox from "../../components/Lightbox/Lightbox";

import ReactPaginate from "react-paginate";

import { LuPlus } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";

function GalleryImage({ data, filter, page, setPage }) {
  const sectionRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const perPage = 8;

  useEffect(() => {
    if (sectionRef.current && page > 1) {
      const top = sectionRef.current.offsetTop - 350;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  }, [page]);

  const filteredImages = data.filter(
    (img) => filter === "Усі" || img.section.includes(filter)
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
      <div ref={sectionRef} className={css.images_wrapper}>
        <>
          {currentImages.map(({ photo, section }, index) => (
            <div key={index} className={css.images_box}>
              <img
                src={photo}
                width={300}
                height={300}
                alt={`Фото ${section} ${index + 1}`}
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
