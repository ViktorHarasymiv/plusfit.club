import { useEffect } from "react";
import { usePostStore } from "../../../../store/postStore";

import css from "./Style.module.css";
import { Link } from "react-router-dom";
import Button from "../../../../components/ui/Button/Button";

function News() {
  const { get_post, content } = usePostStore();

  const perPage = 6;
  const filterBy = "News";

  useEffect(() => {
    const fetch_post_data = async () => {
      await get_post();
    };
    fetch_post_data({ perPage, filterBy });
  }, []);

  return (
    <div>
      <ul className={css.list_wrapper}>
        {content?.map((item, i) => {
          return (
            <li className={css.item_wrapper} key={i}>
              <img
                className={css.image}
                src={item.images[0]}
                alt={`Image ${i}`}
                width={120}
                height={80}
              />
              <div className={css.content_wrapper}>
                <h3 className={css.title}>{item.title}</h3>
                <p className={css.description}>{item.description}</p>
                <ul className={css.tags_list}>
                  {item.tags.map((item, i) => {
                    return (
                      <li className={css.tag_item} key={i}>
                        #{item}
                      </li>
                    );
                  })}
                </ul>
                <Link to={`/blog/${item._id}`} className={css.link}>
                  <Button styles={{ maxHeight: "22px", fontSize: "12px" }}>
                    Get by post
                  </Button>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default News;
