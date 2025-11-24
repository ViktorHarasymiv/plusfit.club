import React, { useEffect } from "react";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import { usePostStore } from "../../store/postStore";

import BlogList from "../../components/Blog/BlogList";

function BlogPage() {
  const { get_post, content } = usePostStore();

  const perPage = 6;

  useEffect(() => {
    const fetch_post_data = async () => {
      await get_post({ perPage });
    };
    fetch_post_data();
  }, []);

  return (
    <main>
      <NavigationContext />
      <div className="container">
        <BlogList data={content} />
      </div>
    </main>
  );
}

export default BlogPage;
