import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavigationContext from "../../components/NavigationContext/NavigationContext";
import { usePostStore } from "../../store/postStore";

import Loader from "../../components/ui/Loader/Loader";
import PostNavigation from "./PostNavigation";

import css from "./Style.module.css";
import SelfPost from "../../components/SelfPost/SelfPost";

function Post() {
  const { id } = useParams();

  return (
    <main>
      <NavigationContext />
      <div className="container">
        <section className={css.wrapper}>
          <SelfPost id={id} />
          <PostNavigation />
        </section>
      </div>
    </main>
  );
}

export default Post;
