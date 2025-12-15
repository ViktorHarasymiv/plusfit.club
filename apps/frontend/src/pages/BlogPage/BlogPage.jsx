import { useEffect, useState } from "react";
import { usePostStore } from "../../store/postStore";

import NavigationContext from "../../components/NavigationContext/NavigationContext";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

import css from "./Style.module.css";

import BlogList from "../../components/Blog/BlogList";
import Button from "../../components/ui/Button/Button";
import BlogFilterNavigation from "./BlogFilterNavigation";

function BlogPage() {
  const { get_post, content, pagination } = usePostStore();

  const { page, totalPages } = pagination;

  const [filters, setFilters] = useState({
    perPage: 6,
    tags: "",
    filterBy: "",
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
    }));
  };

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
        </div>
      </div>
    </main>
  );
}

export default BlogPage;
