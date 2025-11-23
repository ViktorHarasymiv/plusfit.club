import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavigationContext from "../../components/NavigationContext/NavigationContext";

function Post() {
  const { id } = useParams();
  return (
    <main>
      <NavigationContext />
      {id}
    </main>
  );
}

export default Post;
