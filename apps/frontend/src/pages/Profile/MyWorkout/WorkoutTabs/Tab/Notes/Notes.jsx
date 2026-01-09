import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../context/AuthContext";
import { useDiariesStore } from "../../../../../../store/useDiariesStore";

import css from "./Style.module.css";

import Note from "./Note";
import NoteList from "./NoteList";

function Notes() {
  const { user } = useAuth();
  const { fetchDiarieById } = useDiariesStore();

  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    const getFetch = () => {
      if (currentNote !== null) {
        fetchDiarieById(currentNote);
      } else fetchDiarieById(user.activeNote);
    };

    getFetch();
  }, [currentNote]);

  return (
    <div className={css.wrapper}>
      <NoteList setCurrentNote={setCurrentNote} />
      <Note />
    </div>
  );
}

export default Notes;
