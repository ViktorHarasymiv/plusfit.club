import { useDiariesStore } from "../../../../../../store/useDiariesStore";
import Loader from "../../../../../../components/ui/Loader/Loader";
import css from "./Style.module.css";

function Note() {
  const { deleteDiary } = useDiariesStore();
  const { currentNote } = useDiariesStore();

  console.log(currentNote);

  const handleDelete = (id) => {
    deleteDiary(id);
  };

  if (!currentNote) return <h4>Please choose a note!</h4>;

  return (
    <div className={css.note_wrapper}>
      <div className={css.note_actions}>
        <div>patch</div>
        <div onClick={() => handleDelete(currentNote?._id)}>delete</div>
      </div>
      <div className={css.note_tile}>
        <h1>{currentNote?.title}</h1>
        <ul className={css.tags_list}>
          {currentNote.emotions.map((item, i) => (
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
