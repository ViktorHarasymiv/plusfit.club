import React, { useState } from "react";

import Modal from "../../../../../../components/ui/Modal/Modal";

import css from "./Style.module.css";

import { CiCirclePlus } from "react-icons/ci";
import CreateNote from "./CreateNote";

function NoteList() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
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
    </div>
  );
}

export default NoteList;
