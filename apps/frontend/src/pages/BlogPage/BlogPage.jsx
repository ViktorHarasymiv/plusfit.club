import { useEffect, useState } from "react";
import { usePostStore } from "../../store/postStore";

import NavigationContext from "../../components/NavigationContext/NavigationContext";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

import css from "./Style.module.css";

import BlogList from "../../components/Blog/BlogList";
import Button from "../../components/ui/Button/Button";
import BlogFilterNavigation from "./BlogFilterNavigation";
import { useParams } from "react-router-dom";

function BlogPage() {
  const { filter } = useParams();
  const { get_post, content, pagination } = usePostStore();

  const { page, totalPages } = pagination;

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

  const fetchNewPosts = () => {
    setFilters((prev) => ({
      ...prev,
      perPage: prev.perPage + 3,
      page: 1,
    }));
  };

  console.log(content);

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
          {page !== totalPages && (
            <Button action={fetchNewPosts}>FETCH MORE</Button>
          )}
          {content?.length > 5 ? (
            <BlogFilterNavigation filters={filters} setFilters={setFilters} />
          ) : null}
        </div>
      </div>
    </main>
  );
}

export default BlogPage;
