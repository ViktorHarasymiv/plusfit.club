import { useState } from "react";

import { IoSearch } from "react-icons/io5";

import Modal from "./Modal";

import css from "./Search.module.css";

export default function Search() {
  const [show, setShow] = useState(false);

  const action = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className={css.wrapper}>
      <IoSearch className={css.icon} onClick={action}></IoSearch>
      {show && <Modal close={action} />}
    </div>
  );
}
