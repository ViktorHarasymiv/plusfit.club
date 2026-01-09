import { forwardRef, useEffect } from "react";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useEmotionsStore } from "../../../../../../store/emotionStore";
import { useDiariesStore } from "../../../../../../store/useDiariesStore";

import dayjs from "dayjs";

import { Autocomplete, TextField, Checkbox } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import css from "./Style.module.css";
import Button from "../../../../../../components/ui/Button/Button";
import Loader from "../../../../../../components/ui/Loader/Loader";

function CreateNote({ closeModal }) {
  const queryClient = useQueryClient();
  const { createDiary } = useDiariesStore();
  const { fetchEmotions, emotions } = useEmotionsStore();

  const curDate = dayjs().format("YYYY-MM-DD");

  const initialValues = {
    title: "",
    description: "",
    emotions: [],
    date: curDate,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(1, "Назва має містити щонайменше 1 символ")
      .max(64, "Назва не може перевищувати 64 символи")
      .required("Назва обовʼязкова"),
    description: Yup.string()
      .min(1, "Опис має містити щонайменше 1 символ")
      .max(1000, "Опис не може перевищувати 1000 символів")
      .required("Опис обовʼязковий"),
    date: Yup.string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Дата має бути у форматі YYYY-MM-DD")
      .required(),
    emotions: Yup.array()
      .of(Yup.string())
      .min(1, "Обовʼязково вибрати хоча б одну емоцію")
      .max(12, "Неможливо вибрати більше 12 емоцій")
      .required("Емоції обовʼязкові"),
  });

  const CustomPaper = forwardRef(function CustomPaper(props, ref) {
    return (
      <div
        ref={ref}
        {...props}
        style={{
          height: 200,
          backgroundColor: "rgba(0,0,0, 0.9)",
          borderRadius: 6,
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          padding: "5px",
          overflow: "hidden",
        }}
      >
        {props.children}
      </div>
    );
  });

  useEffect(() => {
    const emotions = () => {
      fetchEmotions();
    };

    emotions();
  }, []);

  const mutation = useMutation({
    mutationFn: createDiary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
    },
  });

  if (!emotions) return <Loader />;

  return (
    <div>
      <h2 className={css.form_title}>Create new record</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          mutation.mutate(values, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["diaries"] });
              resetForm();
              closeModal();
            },
          });
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={css.diaryList_form}>
            {/* newDiaryData.title */}
            <div className={css.diaryList_fieldWrap}>
              <label htmlFor="title" className={css.diaryList_fieldLabel}>
                Enter description
              </label>
              <Field name="title">
                {({ field, meta }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter title for record"
                      className={`input ${
                        meta.touched && meta.error ? css.error : ""
                      }`}
                    />
                    {meta.touched && meta.error && (
                      <span className={css.diaryList_fieldError}>
                        {meta.error}
                      </span>
                    )}
                  </>
                )}
              </Field>
            </div>

            {/* newDiaryData.emotions */}
            <div className={css.diaryList_fieldWrap}>
              <label htmlFor="emotions" className={css.diaryList_fieldLabel}>
                Choose your emotions
              </label>
              <Autocomplete
                multiple
                disablePortal
                disableCloseOnSelect
                options={emotions}
                getOptionLabel={(option) => option.title}
                isOptionEqualToValue={(option, value) =>
                  option.title === value.title
                }
                value={emotions.filter(
                  (e) => e._id && (values?.emotions).includes(e.title)
                )}
                onChange={(_, newValue) =>
                  setFieldValue(
                    "emotions",
                    newValue?.map((e) => e.title)
                  )
                }
                PaperComponent={CustomPaper}
                renderOption={(props, option, { selected }) => {
                  const { key, ...rest } = props;
                  return (
                    <li
                      key={key}
                      {...rest}
                      style={{
                        cursor: "pointer",
                        padding: "11px 12px",
                        margin: 0,
                        borderRadius: 6,
                      }}
                    >
                      <Checkbox
                        checked={selected}
                        sx={{
                          padding: 0,
                          marginRight: 1,
                        }}
                        icon={
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              border: "1px solid var(--white)",
                              backgroundColor: "var(--white)",
                            }}
                          />
                        }
                        checkedIcon={
                          <div
                            style={{
                              borderRadius: 4,
                              border: "1px solid var(--white)",
                              background: "var(--aceent-color)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CheckIcon
                              style={{ color: "#fff", fontSize: 14 }}
                            />
                          </div>
                        }
                      />
                      {option.title}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Choose emotion"
                    variant="outlined"
                    fullWidth
                    className="input"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        width: "450px",
                        borderRadius: "6px",
                        color: "var(--white)",
                        opacity: 1,
                      },
                      "& .MuiInputBase-input::placeholder": {
                        fontFamily: "var(--font-family-base) !important",
                        fontSize: "14px",
                        opacity: 0.8, // важливо, бо MUI ставить 0.5
                      },
                      "& .MuiChip-root": {
                        color: "white",
                      },

                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },

                      "& .MuiChip-deleteIcon": {
                        color: "white",
                      },

                      "& .MuiAutocomplete-clearIndicator": {
                        color: "white !important",
                      },
                    }}
                  />
                )}
              />

              <ErrorMessage
                name="emotions"
                component="span"
                className={css.diaryList_fieldError}
              />
            </div>

            {/* newDiaryData.description */}
            <div className={css.diaryList_fieldWrap}>
              <label htmlFor="description" className={css.diaryList_fieldLabel}>
                Enter your record
              </label>
              <Field name="description">
                {({ field, meta }) => (
                  <>
                    <textarea
                      {...field}
                      id="description"
                      rows={8}
                      placeholder="Write down how you feel"
                      className={`input ${css.textarea}  ${
                        meta.touched && meta.error ? css.error : ""
                      }`}
                    />
                    {meta.touched && meta.error && (
                      <span className={css.diaryList_fieldError}>
                        {meta.error}
                      </span>
                    )}
                  </>
                )}
              </Field>
            </div>

            <Button type="submit">Send</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateNote;
