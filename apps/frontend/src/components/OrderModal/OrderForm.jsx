import { useMemo } from "react";

import { create_subscripter } from "../../services/subscriptions";

// MEDIA

import css from "./Style.module.css";

import { MdAddCard } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";

/* FORMIK */

import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";

/* MUI SELECT */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/* MUI DATA */

import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useAuth } from "../../context/AuthContext";

import { useToastStore } from "../../store/toastStore";

import Button from "../ui/Button/Button";

function OrderForm({ payload, close }) {
  const { showToast } = useToastStore();

  // USER

  const { user } = useAuth();

  const { name, email } = user;

  // CONSTANT

  let age = 0;

  const today = dayjs();

  const maxDateStart = today.subtract(0, "year"); // наймолодший допустимий вік
  const minDateEnd = today.subtract(-5, "year"); // найстарший допустимий вік

  // DATA UTILS

  const FormikDatePickerStart = () => {
    const { setFieldValue } = useFormikContext();

    return (
      <DesktopDatePicker
        label="Початкова дата занять"
        minDate={maxDateStart}
        maxDate={minDateEnd}
        onChange={(newValue) =>
          setFieldValue("startDate", newValue.toISOString())
        }
        slotProps={{
          textField: {
            height: "44px",

            sx: {
              ".MuiInputLabel-root": {
                fontSize: "14px",
                color: "var(--white)",
                lineHeight: "1",
              },

              ".MuiInputLabel-root.Mui-focused": {
                color: "var(--accent-color)",
              },

              ".MuiPickersSectionList-root": {
                padding: "12px 30px",
                fontSize: "14px",
                width: "fit-content",
              },
              ".MuiSvgIcon-root": {
                width: "16px",
                fill: "var(--white)",
              },

              ".MuiPickersOutlinedInput-root": {
                color: "var(--white)",
              },

              ".MuiPickersOutlinedInput-notchedOutline": {
                borderColor: "var(--white)",
              },

              "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "var(--accent-color) !important",
              },

              "&:hover .MuiPickersOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "var(--accent-color) !important",
              },
            },
          },
        }}
      />
    );
  };

  // UTILS

  function generateCustomId() {
    const prefix = "CL";
    const chars = "0123456789";
    let randomPart = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomPart += chars[randomIndex];
    }

    return prefix + randomPart;
  }

  // VALIDATION

  const initialValues = {
    clientId: generateCustomId(),
    name: name || "",
    email: email || "",
    phone: "",
    type: payload.name || "",
    timeBorder: 0,
    startDate: "",
    endDate: "",
    price: payload.description[0].price || "",
    status: "Очікує оплати",
    method: "",
  };

  const validationSchema = Yup.object({
    clientId: Yup.string()
      .matches(/^.{8}$/, "Має бути рівно 8 символів")
      .matches(/^CL\d{6}$/, 'Має починатися з "CL" і містити 6 цифр')
      .required("Обов'язково"),

    name: Yup.string()
      .matches(
        /^[А-Яа-яЁёІіЇїЄєҐґA-Za-z]+ [А-Яа-яЁёІіЇїЄєҐґA-Za-z]+$/,
        "Ім’я має містити прізвище та ім’я через пробіл"
      )
      .required("Ім’я обов’язкове"),

    phone: Yup.string()
      .matches(/^\+380\d{9}$/, "Телефон має бути у форматі +380XXXXXXXXX")
      .required("Телефон обов’язковий"),

    email: Yup.string()
      .email("Невірний email")
      .matches(/@gmail\.com$/, "Email має бути @gmail.com")
      .required("Обов’язково"),

    type: Yup.string().required("Тип обов’язковий"),

    startDate: Yup.date().required("Дата початку обов’язкова"),

    price: Yup.number()
      .typeError("Ціна має бути числом")
      .min(0, "Ціна не може бути відʼємною")
      .required("Ціна обов’язкова"),

    method: Yup.string().required("Метод оплати обов’язковий"),
  });

  const subscriptionDurationMonths = (type) => {
    switch (type) {
      case "1 місяць":
        return 1;
      case "3 місяці БЕЗЛІМ":
        return 3;
      case "Піврічний БЕЗЛІМ":
        return 6;
      default:
        return 1;
    }
  };

  const calculateEndDate = (startDate, monthsToAdd) => {
    return dayjs(startDate).add(monthsToAdd, "month").toISOString();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        const endDate = calculateEndDate(
          values.startDate,
          subscriptionDurationMonths(payload.name)
        );

        const data = {
          ...values,
          endDate,
        };

        try {
          await create_subscripter(data);
          resetForm();
          close();
          showToast(
            <span style={{ display: "flex", alignItems: "center" }}>
              <MdAddCard
                style={{
                  color: "var(--white)",
                  marginRight: "6px",
                }}
              />
              Абонемент успішно зареєстровано
            </span>
          );
        } catch (error) {
          const message = error?.message;
          alert(message);
        }
      }}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form className={css.form_block}>
          <div className={css.input_wrapper}>
            {/* Дані клієнта */}
            <h2 className={css.section_title}>Дані клієнта</h2>
            <div className={css.content_wrapper}>
              <div className="input_wrapper">
                <Field
                  name="name"
                  placeholder="Прізвище Ім'я"
                  className="input"
                  disabled
                />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="input_wrapper">
                <Field
                  name="email"
                  placeholder="Email"
                  className="input"
                  disabled
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="input_wrapper">
                <Field name="phone" placeholder="Телефон" className="input" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
            </div>

            {/* Тип підписки */}
            <h2 className={css.section_title}>Тип абонементу</h2>

            <div className="input_wrapper">
              {/* Айді */}
              <div className={css.id_wrapper}>
                <Field
                  name="clientId"
                  placeholder="ID клієнта"
                  className="input"
                  disabled
                />
                <IoMdRefresh
                  className="refresh_icon"
                  onClick={() => {
                    const newId = generateCustomId();
                    setFieldValue("clientId", newId);
                  }}
                />
                <ErrorMessage
                  name="clientId"
                  component="div"
                  className="error"
                />
              </div>

              {/* Тип */}

              <div className="input_wrapper">
                <FormControl
                  sx={{ m: 1, maxWidth: "186px", width: "100%", margin: "0px" }}
                >
                  <Select
                    name="type"
                    value={values.type}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue(
                        "price",
                        getSubscriptionDetails(e.target.value)
                      );
                    }}
                    disabled
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    sx={{
                      backgroundColor: "transparent",

                      padding: "12px 0",
                      fontSize: "14px",

                      height: "44px",

                      borderRadius: "0",
                      ".MuiOutlinedInput-input.Mui-disabled": {
                        borderColor: "var(--white)",
                        WebkitTextFillColor: "var(--white)",
                      },

                      "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--white)",
                      },

                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 1)", // яскравіше при ховері
                      },
                      "&.Mui-focused .MuiSelect-icon": {
                        color: "rgba(255, 255, 255, 0.8);",
                      },

                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.8);",
                        borderRadius: "6px",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "1px",
                        borderColor: "rgba(255, 255, 255, 0.8)",
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Тип підписки</em>
                    </MenuItem>
                    <MenuItem value={"1 тренування"}>1 тренування</MenuItem>
                    <MenuItem value={"10 тренувань"}>10 тренувань</MenuItem>
                    <MenuItem value={"1 місяць БЕЗЛІМ"}>
                      1 місяць безліміт
                    </MenuItem>
                    <MenuItem value={"3 місяці БЕЗЛІМ"}>
                      3 місяць безліміт
                    </MenuItem>
                    <MenuItem value={"Піврічний БЕЗЛІМ"}>
                      Піврічний безліміт
                    </MenuItem>
                    <MenuItem value={"Тариф сімейний 1+1"}>
                      Тариф сімейний 1 + 1
                    </MenuItem>

                    <MenuItem
                      value={"Підлітковий 13-17 років"}
                      disabled={age > 17 || 13 > age}
                    >
                      Підлітковий 13-17 р.
                    </MenuItem>
                    <MenuItem value={"РЕСПЕКТ +55"} disabled={age < 55}>
                      "Респект" +55 р.
                    </MenuItem>
                  </Select>
                </FormControl>
                <ErrorMessage name="type" component="div" className="error" />
              </div>
              {payload.description.length > 1 && (
                <div className="input_wrapper">
                  <FormControl sx={{ m: 1, margin: "0px" }}>
                    <Select
                      name="timeBorder"
                      value={values.timeBorder}
                      onChange={(e) => {
                        const selected = e.target.value;
                        handleChange(e); // оновлює timeBorder у Formik

                        // оновлюємо price залежно від вибору
                        const newPrice =
                          selected === 0
                            ? payload.description[0]?.price
                            : payload.description[1]?.price;

                        if (newPrice !== undefined) {
                          setFieldValue("price", newPrice);
                        }
                      }}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                      sx={{
                        color: "rgba(255, 255, 255, 0.8)",

                        padding: "12px 0",
                        height: "44px",

                        fontSize: "14px",

                        borderRadius: "0",
                        "& .MuiSelect-icon": {
                          color: " rgba(255, 255, 255, 0.8)",
                        },
                        "&.Mui-focused .MuiSelect-icon": {
                          color: " rgba(255, 255, 255, 0.8)",
                        },

                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255, 255, 255, 1)", // яскравіше при ховері
                        },
                        ".MuiOutlinedInput-notchedOutline": {
                          borderRadius: "6px",
                          borderColor: " rgba(255, 255, 255, 0.8)",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "1px",
                          borderColor: "rgba(255, 255, 255, 0.8);",
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Часові рамки</em>
                      </MenuItem>
                      <MenuItem value={0}>9:00-13:00</MenuItem>
                      <MenuItem value={1}>9:00-21:00</MenuItem>
                    </Select>
                  </FormControl>
                  <ErrorMessage
                    name="method"
                    component="div"
                    className="error"
                  />
                </div>
              )}
            </div>

            {/* Початкова дата */}
            <h2 className={css.section_title}>Тривалість</h2>

            <div className="date_wrapper">
              <div className="input_wrapper">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <FormikDatePickerStart />
                </LocalizationProvider>

                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="error"
                />
              </div>

              {/* Кінцева дата */}
              {/* <div className="input_wrapper" style={{ marginTop: "10px" }}>
                <h3>
                  Термін дії :{" "}
                  {values.startDate ? (
                    <span>
                      {calculateEndDate(
                        values.startDate,
                        subscriptionDurationMonths(payload.name)
                      ).format("DD.MM.YYYY")}
                    </span>
                  ) : (
                    "-"
                  )}
                </h3>
              </div> */}
            </div>

            <h2 className={css.section_title}>Оплата</h2>

            {/* Метод оплати */}

            <div className="input_wrapper">
              <FormControl sx={{ m: 1, margin: "0px" }}>
                <Select
                  name="method"
                  value={values.method}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",

                    padding: "12px 0",
                    height: "44px",

                    fontSize: "14px",

                    borderRadius: "0",
                    "& .MuiSelect-icon": {
                      color: " rgba(255, 255, 255, 0.8)",
                    },
                    "&.Mui-focused .MuiSelect-icon": {
                      color: " rgba(255, 255, 255, 0.8)",
                    },

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 1)", // яскравіше при ховері
                    },
                    ".MuiOutlinedInput-notchedOutline": {
                      borderRadius: "6px",
                      borderColor: " rgba(255, 255, 255, 0.8)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderWidth: "1px",
                      borderColor: "rgba(255, 255, 255, 0.8);",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Метод оплати</em>
                  </MenuItem>
                  <MenuItem value={"Готівка"}>
                    Готівка при першому вході
                  </MenuItem>
                  <MenuItem value={"Карта"}>Картка при першому вході</MenuItem>
                  <MenuItem value={"Рахунок"}>Переказ на рахунок</MenuItem>
                </Select>
              </FormControl>
              <ErrorMessage name="method" component="div" className="error" />
            </div>
          </div>

          {/* Відправити */}

          <div className={css.total_wrapper}>
            <div className={css.price}>
              {values.timeBorder === 0
                ? payload.description[0].price
                : payload.description[1].price}{" "}
              ГРН
            </div>
            <Button
              type="submit"
              className="button"
              styles={{ fontSize: "12px" }}
            >
              Надіслати
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default OrderForm;
