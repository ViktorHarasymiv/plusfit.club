import css from "./Style.module.css";

import Item from "./Item";

function BlogList({ data }) {
  console.log(data);

  return (
    <div className={css.wrapper}>
      <div className={css.grid_wrapper}>{data && <Item data={data} />}</div>
    </div>
  );
}

export default BlogList;
