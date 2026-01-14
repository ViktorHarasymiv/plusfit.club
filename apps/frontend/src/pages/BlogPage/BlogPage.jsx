import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePostStore } from "../../store/postStore";

import NavigationContext from "../../components/NavigationContext/NavigationContext";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

import css from "./Style.module.css";

import BlogList from "../../components/Blog/BlogList";
import BlogFilterNavigation from "./BlogFilterNavigation";
import ReactPaginate from "react-paginate";

function BlogPage() {
  const { filter } = useParams();
  const { get_post, content, pagination } = usePostStore();

  const { page, perPage, totalPages, totalItems } = pagination;

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;

    setFilters((prev) => ({
      ...prev,
      page: selectedPage,
    }));
  };

  const optimizationFilter =
    filter !== undefined
      ? filter.charAt(0).toUpperCase() + filter.slice(1)
      : "";

  const [filters, setFilters] = useState({
    perPage: 6,
    tags: "",
    filterBy: optimizationFilter,
  });

  useEffect(() => {
    const fetch_post_data = async () => {
      await get_post({ ...filters });
    };
    fetch_post_data();
  }, [filters]);

  return (
    <main>
      <NavigationContext />
      <div className="container">
        <div className={css.wrapper_page}>
          <SectionTitle
            title={"Our Blog"}
            about={"Let's Check Latest News & Blog"}
          />
          <BlogFilterNavigation filters={filters} setFilters={setFilters} />
          <BlogList data={content} />
          {totalItems > perPage && (
            <ReactPaginate
              className={css.pagination}
              breakLabel="..."
              activeClassName={css.active_pagination}
              nextLabel={null}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              forcePage={page - 1}
              previousLabel={null}
              renderOnZeroPageCount={null}
            />
          )}

          {totalItems > perPage ? (
            <BlogFilterNavigation filters={filters} setFilters={setFilters} />
          ) : null}
        </div>
      </div>
    </main>
  );
}

export default BlogPage;
