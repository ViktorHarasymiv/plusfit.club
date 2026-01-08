import React from "react";

import css from "./Style.module.css";
import NoteList from "./NoteList";
import Note from "./Note";

function Notes() {
  return (
    <div className={css.wrapper}>
      <NoteList />
      <Note />
    </div>
  );
}

export default Notes;
