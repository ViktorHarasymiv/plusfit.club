import { useState } from "react";

import { useDiariesStore } from "../../../../../../store/useDiariesStore";

import Modal from "../../../../../../components/ui/Modal/Modal";

import { RiFileEditLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";

import css from "./Style.module.css";
import EditNote from "./EditNote";

function Note() {
  // STORE

  const { deleteDiary } = useDiariesStore();
  const { currentNote } = useDiariesStore();

  // STATE

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // FUNCTION

  const handleDelete = (id) => {
    deleteDiary(id);
  };

  if (!currentNote) return <h4>Please choose a note!</h4>;

  return (
    <div className={css.note_wrapper}>
      <div className={css.note_actions}>
        <button
          type="button"
          className={css.icon}
          onClick={() => setEditModalOpen(true)}
        >
          <RiFileEditLine />
        </button>
        <button
          type="button"
          onClick={() => handleDelete(currentNote?._id)}
          className={css.icon}
        >
          <MdDeleteOutline />
        </button>
        <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
          <EditNote
            closeModal={() => {
              setEditModalOpen(false);
            }}
          />
        </Modal>
      </div>
      <div className={css.note_tile}>
        <h1>{currentNote?.title}</h1>
        <ul className={css.tags_list}>
          {currentNote?.emotions.map((item, i) => (
            <li key={i} className={css.tag_item}>
              {item}
            </li>
          ))}
        </ul>
        <p>{currentNote?.description}</p>
      </div>
    </div>
  );
}

export default Note;
