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

  const { name, email, phone } = user;

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
        label="Start date of classes"
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
    phone: phone || "",
    type: payload.name || "",
    timeBorder: 0,
    startDate: "",
    endDate: "",
    price: payload.description[0].price || "",
    status: "Wait for paid",
    method: "",
  };

  const validationSchema = Yup.object({
    clientId: Yup.string()
      .matches(/^.{8}$/, "Must be exactly 8 characters")
      .matches(/^CL\d{6}$/, 'Must start with "CL" and contain 6 digits')
      .required("Required"),

    name: Yup.string()
      .matches(
        /^[А-Яа-яЁёІіЇїЄєҐґA-Za-z]+ [А-Яа-яЁёІіЇїЄєҐґA-Za-z]+$/,
        "Name must contain surname and first name separated by a space"
      )
      .required("Name is required"),

    phone: Yup.string()
      .matches(/^\+380\d{9}$/, "Phone must be in format +380XXXXXXXXX")
      .required("Phone is required"),

    email: Yup.string().email("Invalid email").required("Required"),

    type: Yup.string().required("Type is required"),

    startDate: Yup.date().required("Start date is required"),

    price: Yup.number()
      .typeError("Price must be a number")
      .min(0, "Price cannot be negative")
      .required("Price is required"),

    method: Yup.string().required("Payment method is required"),
  });

  const subscriptionDurationMonths = (type) => {
    switch (type) {
      case "Basic":
        return 1;
      case "Standart":
        return 3;
      case "Premium":
        return 6;
      case "Vip":
        return 12;
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
              Subscription successfully registered
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
            <h2 className={css.section_title}>Your information</h2>
            <div className={css.content_wrapper}>
              <div className="input_wrapper">
                <Field
                  name="name"
                  placeholder="Enter Full name"
                  className="input"
                  disabled
                />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="input_wrapper">
                <Field
                  name="email"
                  placeholder="Enter Email"
                  className="input"
                  disabled
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="input_wrapper">
                <Field
                  name="phone"
                  placeholder="Enter your phone"
                  className="input"
                />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
            </div>

            {/* Тип підписки */}
            <h2 className={css.section_title}>Subscription type</h2>

            <div className="input_wrapper">
              {/* Айді */}
              <div className={css.id_wrapper}>
                <Field
                  name="clientId"
                  placeholder="ID"
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
                      <em>Type</em>
                    </MenuItem>
                    <MenuItem value={"Basic"}>Basic</MenuItem>
                    <MenuItem value={"Standart"}>Standart</MenuItem>
                    <MenuItem value={"Premium"}>Premium</MenuItem>
                    <MenuItem value={"Vip"}>Vip</MenuItem>
                  </Select>
                </FormControl>
                <ErrorMessage name="type" component="div" className="error" />
              </div>
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
                      <em>Time border:</em>
                    </MenuItem>
                    <MenuItem value={0}>9:00 - 21:00</MenuItem>
                    {payload.description.length > 1 && (
                      <MenuItem value={1}>9:00 - 00:00</MenuItem>
                    )}
                  </Select>
                </FormControl>
                <ErrorMessage
                  name="timeBorder"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            {/* Початкова дата */}

            <h2 className={css.section_title}>Date</h2>

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
            </div>

            <h2 className={css.section_title}>Payment</h2>

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
                    <em>Method</em>
                  </MenuItem>
                  <MenuItem value={"Cash"}>Cash</MenuItem>
                  <MenuItem value={"Card"}>Card</MenuItem>
                  <MenuItem value={"Transfer"}>Transfer</MenuItem>
                </Select>
              </FormControl>
              <ErrorMessage name="method" component="div" className="error" />
            </div>
          </div>

          {/* Відправити */}

          <div className={css.total_wrapper}>
            <div className={css.price}>
              <span>To pay: </span>
              {values.timeBorder === 0
                ? payload.description[0].price
                : payload.description[1].price}{" "}
              $
            </div>
            <Button
              type="submit"
              className="button"
              styles={{ fontSize: "12px" }}
            >
              SEND ORDER
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default OrderForm;
