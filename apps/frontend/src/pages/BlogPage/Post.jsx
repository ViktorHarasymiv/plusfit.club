import { useParams } from "react-router-dom";
import NavigationContext from "../../components/NavigationContext/NavigationContext";

import PostNavigation from "./PostNavigation";

import css from "./Style.module.css";
import SelfPost from "../../components/SelfPost/SelfPost";
import { useState } from "react";

function Post() {
  const { id } = useParams();

  const [query, setQuery] = useState("");

  return (
    <main>
      <NavigationContext />
      <div className="container">
        <section className={css.wrapper}>
          <SelfPost id={id} setQuery={setQuery} />
          <PostNavigation query={query} setQuery={setQuery} />
        </section>
      </div>
    </main>
  );
}

export default Post;
