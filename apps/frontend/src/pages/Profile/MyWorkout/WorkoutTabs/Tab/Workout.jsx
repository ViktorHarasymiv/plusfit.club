import { useEffect, useState } from "react";
import { Formik, Form } from "formik";

/* MUI SELECT */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import css from "./Style.module.css";
import WorkoutDay from "./WorkoutDay";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { useProgramsStore } from "../../../../../store/programs";

import { useAuth } from "../../../../../context/AuthContext";
import Loader from "../../../../../components/ui/Loader/Loader";

function Workout() {
  const { user } = useAuth();
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

  if (!programOptions && !activeProgram) return <Loader />;

  console.log(activeProgram);

  return (
    <div className={css.workout_wrapper}>
      <div className={css.title_wrapper}>
        <h1 className={css.title}>My training plan</h1>
        <div className={css.action_wrapper}>
          <button type="button" className={css.add_new_day}>
            <FaPlus />
            New program
          </button>

          {/* Section */}
          <Formik>
            <Form className={css.form_wrapper}>
              <FormControl
                sx={{ m: 1, maxWidth: 304, width: "100%", margin: "0px" }}
              >
                <Select
                  name="programs"
                  value=""
                  onChange={(e) => {
                    const id = e.target.value;
                    fetchProgramById(id); // завантажуємо повну програму
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

                    borderRadius: "6px",
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
            </Form>
          </Formik>
        </div>
      </div>
      <div className={css.plan_wrapper}>
        <WorkoutDay program={activeProgram} dayData={activeProgram.days} />
        {!activeProgram.isPublic && (
          <div className={css.action_wrapper}>
            <button type="button" className={css.add_new_day}>
              <FaPlus />
              Push day
            </button>
            <button type="button" className={css.add_new_day}>
              <FaMinus />
              Delete day
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workout;
