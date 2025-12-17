import css from "./Style.module.css";

import Item from "./Item";

function BlogList({ data }) {
  return (
    <div className={css.wrapper}>
      {data?.length === 0 ? (
        <h1>No posts match your filters. Please try different ones</h1>
      ) : (
        <div className={css.grid_wrapper}>{data && <Item data={data} />}</div>
      )}
    </div>
  );
}

export default BlogList;
