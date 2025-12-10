import React, { useEffect } from "react";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import { usePostStore } from "../../store/postStore";

import SectionTitle from "../../components/SectionTitle/SectionTitle";

import css from "./Style.module.css";

import BlogList from "../../components/Blog/BlogList";
import Button from "../../components/ui/Button/Button";
import { useState } from "react";
import BlogFilterNavigation from "./BlogFilterNavigation";

function BlogPage() {
  const { get_post, content, pagination } = usePostStore();

  const { page, totalPages } = pagination;

  const [perPage, setPerPage] = useState(6);

  useEffect(() => {
    const fetch_post_data = async () => {
      await get_post({ perPage });
    };
    fetch_post_data();
  }, [perPage]);

  const fetchNewPosts = () => {
    setPerPage((prev) => prev + 3);
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
          <BlogFilterNavigation />
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
