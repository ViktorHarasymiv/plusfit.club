import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { forwardRef } from 'react';
import { NewDiaryData, Emotion, DiaryEntry } from '@/types/diary';
import * as Yup from 'yup';
import Button from '../ui/Button/Button';
import { createDiary, patchDiary } from '@/lib/api/clientApi';
import dayjs from 'dayjs';
import { useEmotionsStore } from '@/lib/store/emotionStore';
import { Autocomplete, TextField, Checkbox } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import css from './AddDiaryEntryForm.module.css';
import { useDiaryStore } from '@/lib/store/diaryStore';

const curDate = dayjs().format('YYYY-MM-DD');

interface Props {
  closeModal: () => void;
  data?: DiaryEntry;
  patchMode?: boolean;
}

export default function AddDiaryEntryForm({
  closeModal,
  data,
  patchMode,
}: Props) {
  const queryClient = useQueryClient();
  const { emotions } = useEmotionsStore();
  const { fetchDiaries, setSelectedDiary } = useDiaryStore();

  const initialValues: NewDiaryData = {
    title: data?.title || '',
    description: data?.description || '',
    emotions: data?.emotions || [],
    date: curDate,
  };

  type DiaryMutationResponse = {
    data: {
      diary: DiaryEntry;
    };
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(1, 'Назва має містити щонайменше 1 символ')
      .max(64, 'Назва не може перевищувати 64 символи')
      .required('Назва обовʼязкова'),
    description: Yup.string()
      .min(1, 'Опис має містити щонайменше 1 символ')
      .max(1000, 'Опис не може перевищувати 1000 символів')
      .required('Опис обовʼязковий'),
    date: Yup.string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, 'Дата має бути у форматі YYYY-MM-DD')
      .required(),
    emotions: Yup.array()
      .of(Yup.string())
      .min(1, 'Обовʼязково вибрати хоча б одну емоцію')
      .max(12, 'Неможливо вибрати більше 12 емоцій')
      .required('Емоції обовʼязкові'),
  });

  const mutationFn = (diaryData: NewDiaryData) =>
    patchMode ? patchDiary(data!._id, diaryData) : createDiary(diaryData);

  const { mutate } = useMutation({
    mutationFn,
    onSuccess: (updatedDiary: unknown) => {
      const diary = (updatedDiary as { data: { diary: DiaryEntry } }).data
        .diary;

      console.log(data);

      queryClient.invalidateQueries({ queryKey: ['diaryDraft'] });
      setSelectedDiary(diary ?? null);
      fetchDiaries();
    },
  });

  const CustomPaper = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
    function CustomPaper(props, ref) {
      return (
        <div
          ref={ref}
          {...props}
          style={{
            backgroundColor: 'var(--color-neutral-lightest)',
            borderRadius: 12,
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            maxHeight: 250,
            overflowY: 'auto',
            padding: '4px 0',
          }}
        >
          {props.children}
        </div>
      );
    }
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutate(values, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['diaryDraft'] });
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
              Заголовок
            </label>
            <Field name="title">
              {({ field, meta }: FieldProps<string>) => (
                <>
                  <input
                    {...field}
                    type="text"
                    placeholder="Введіть заголовок запису"
                    className={`${css.diaryList_fieldInput} ${
                      meta.touched && meta.error ? css.error : ''
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
              Категорії
            </label>
            <Autocomplete<Emotion, true, false, false>
              multiple
              disablePortal
              disableCloseOnSelect
              options={emotions}
              getOptionLabel={option => option.title}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              value={emotions?.filter(
                e => e._id && (values.emotions as string[]).includes(e._id)
              )}
              onChange={(_, newValue) =>
                setFieldValue(
                  'emotions',
                  newValue?.map(e => e._id)
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
                      padding: '11px 12px',
                      margin: 0,
                      backgroundColor: selected
                        ? 'var(--opacity-neutral-darkest-5)'
                        : 'transparent',
                      cursor: 'pointer',
                      borderRadius: 8,
                    }}
                  >
                    <Checkbox
                      checked={selected}
                      sx={{ padding: 0, marginRight: 1 }}
                      icon={
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 4,

                            border: '1px solid var(--opacity-transparent)',
                            backgroundColor: 'var(--opacity-neutral-darkest-5)',
                          }}
                        />
                      }
                      checkedIcon={
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: 4,
                            border: '1px solid #000',
                            backgroundColor: '#000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <CheckIcon style={{ color: '#fff', fontSize: 14 }} />
                        </div>
                      }
                    />
                    {option.title}
                  </li>
                );
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  placeholder="Виберіть емоції"
                  size="small"
                  variant="outlined"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: 'var(--color-neutral-lightest)',
                      '& fieldset': { border: 'none' },
                      '&:hover fieldset': { border: 'none' },
                      '&.Mui-focused fieldset': { border: 'none' },
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
              Запис
            </label>
            <Field name="description">
              {({ field, meta }: FieldProps<string>) => (
                <>
                  <textarea
                    {...field}
                    id="description"
                    rows={8}
                    placeholder="Запишіть, як ви себе відчуваєте"
                    className={`${css.diaryList_fieldInput} ${
                      meta.touched && meta.error ? css.error : ''
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

          <Button type="submit">Зберегти</Button>
        </Form>
      )}
    </Formik>
  );
}
