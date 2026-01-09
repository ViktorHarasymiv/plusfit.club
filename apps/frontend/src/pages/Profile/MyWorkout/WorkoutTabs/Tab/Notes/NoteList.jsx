import React, { useState, useEffect } from "react";

import Modal from "../../../../../../components/ui/Modal/Modal";

import css from "./Style.module.css";

import { CiCirclePlus } from "react-icons/ci";
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
      <div className={css.list_note_wrapper}>
        <h2>Your records</h2>
        <div className={css.list_action_wrapper}>
          <span>New Record</span>
          <button type="button" onClick={() => setCreateModalOpen(true)}>
            <CiCirclePlus />
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
      </div>
      <ul className={css.list_wrapp}>
        {diaries.map(({ _id, title, emotions }, i) => (
          <li
            onClick={() => chooseNote(_id)}
            key={i}
            className={css.diarie_item}
          >
            <h2 className={css.diarie_title}>{title}</h2>
            <ul className={css.tags_list}>
              {emotions.map((item, i) => (
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
