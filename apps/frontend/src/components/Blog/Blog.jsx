import { useEffect } from "react";
import { usePostStore } from "../../store/postStore";

import SectionTitle from "../SectionTitle/SectionTitle";
import BlogList from "./BlogList";
import { Link } from "react-router-dom";
import Button from "../ui/Button/Button";

import css from "./Style.module.css";

function Blog({ perPage }) {
  const { get_post, content } = usePostStore();

  useEffect(() => {
    const fetch_post_data = async () => {
      await get_post();
    };
    fetch_post_data({ perPage });
  }, []);

  return (
    <section>
      <SectionTitle title={"Our Blog"} about={"Latest News & Blog"} />
      <div className="container">
        <div className={css.section_wrapper}>
          <BlogList data={content} />
          <Link to={"/blog"}>
            <Button>Show more</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Blog;
