import React, { useState, useEffect } from "react";

import Modal from "../../../../../../components/ui/Modal/Modal";
import { timeFormatted } from "../../../../../../utils/timeFormated";
import css from "./Style.module.css";

import { FaRegSquarePlus } from "react-icons/fa6";
import CreateNote from "./CreateNote";
import { useDiariesStore } from "../../../../../../store/useDiariesStore";
import { useAuth } from "../../../../../../context/AuthContext";

function NoteList({ setCurrentNote }) {
  const { patchUser } = useAuth();
  const { fetchDiaries, diaries } = useDiariesStore();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchDiaries(1);
  }, []);

  const chooseNote = (id) => {
    patchUser({ activeNote: id });
    setCurrentNote(id);
  };

  return (
    <div className={css.list_wrapper}>
      <div className={css.note_actions}>
        <h2>Records list</h2>
        <button
          type="button"
          onClick={() => setCreateModalOpen(true)}
          className={css.icon}
        >
          <FaRegSquarePlus />
        </button>
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
        >
          <CreateNote
            closeModal={() => {
              setCreateModalOpen(false);
            }}
          />
        </Modal>
      </div>
      <ul className={css.list_wrapp}>
        {diaries.map(({ _id, title, emotions, createdAt }, i) => (
          <li
            onClick={() => chooseNote(_id)}
            key={i}
            className={css.diarie_item}
          >
            <div className={css.note_actions}>
              <h2 className={css.diarie_title}>{title}</h2>
              <span className={css.date}>{timeFormatted(createdAt)}</span>
            </div>
            <ul className={css.tags_list}>
              {emotions?.map((item, i) => (
                <li key={i} className={css.tag_item}>
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
