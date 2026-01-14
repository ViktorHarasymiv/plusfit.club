import { useAuth } from "../../../../../../context/AuthContext";
import { useEffect, useState } from "react";

/* MUI SELECT */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import css from "./Style.module.css";
import WorkoutDay from "./WorkoutDay";

import { FaPlus } from "react-icons/fa";
import { useProgramsStore } from "../../../../../../store/programs";

import Loader from "../../../../../../components/ui/Loader/Loader";
import CreateProgram from "./CreateProgram";

function Workout() {
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  console.log(openModal);

  const { user, patchUser } = useAuth();
  const {
    fetchPrograms,
    fetchProgramOptions,
    programOptions,
    fetchProgramById,
    activeProgram,
  } = useProgramsStore();

  useEffect(() => {
    if (!user?._id) return;
    fetchProgramOptions(user._id);
    fetchPrograms(user._id);
  }, []);

  useEffect(() => {
    if (!user?.activeProgram) return;
    fetchProgramById(user.activeProgram);
  }, [user._id]);

  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };

  // Create modal

  if (!programOptions && !activeProgram) return <Loader />;

  return (
    <div className={css.workout_wrapper}>
      <div className={css.title_wrapper}>
        <h1 className={css.title}>My training plan</h1>
        <div className={css.action_wrapper}>
          <button
            type="button"
            className={css.add_new_day}
            onClick={() => setOpenModal((prev) => !prev)}
          >
            <FaPlus />
            New program
          </button>
          {/* Create modal */}
          {openModal && (
            <CreateProgram openModal={openModal} setOpenModal={setOpenModal} />
          )}
          {/* Section */}
          <FormControl sx={{ maxWidth: "166px", margin: "0px" }}>
            <Select
              name="programs"
              value=""
              onChange={(e) => {
                const id = e.target.value;
                fetchProgramById(id); // завантажуємо повну програму
                patchUser({ activeProgram: id });
                setEdit(false);
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              MenuProps={{
                disableScrollLock: true,
              }}
              sx={{
                backgroundColor: "var(--light-color)",
                color: "var(--accent-color)",
                fontWeight: "700",
                "& .MuiSelect-icon": {
                  color: "var(--accent-color) !important",
                },
                "&.Mui-focused .MuiSelect-icon": {
                  color: "var(--accent-color)",
                },

                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--accent-color) !important",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "1px",
                  borderColor: "var(--accent-color)",
                },
              }}
            >
              <MenuItem value="" disabled>
                <em>Training program</em>
              </MenuItem>
              {programOptions.map(({ _id, name }) => {
                return (
                  <MenuItem key={_id} value={_id}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={css.plan_wrapper}>
        <WorkoutDay
          program={activeProgram}
          dayData={activeProgram.days}
          toggleEdit={toggleEdit}
          setEdit={setEdit}
          edit={edit}
        />
      </div>
    </div>
  );
}

export default Workout;
