import * as yup from "yup";

const Today = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const SEARCH_SCHEMA = yup.object().shape({
  search: yup.string().required("Please type something"),
});

export const FRONTPAGESEARCH_SCHEMA = yup.object().shape({
  search: yup.string().required("Please type something"),
});

export const ENQUIRY_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Name must be atleast 3 characters"),
  email: yup.string().required("Please enter your email").email("Ivalid email"),
  phone: yup
    .number()
    .required("Please enter a phone number")
    .min(10000000, "Enter 8 digit number"),
  message: yup.string().max(200, "Message must be less than 200 characters"),
  people: yup.number().required("Please choose an option"),
  rooms: yup.number().required("Please choose an option"),
  date_from: yup
    .date()
    .required("Select a date")
    .min(Today(), "Date cannot be in the past"),
  date_to: yup.date().min(yup.ref("date_from"), "Date must be later"),
});

export const CONTACT_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Name must be atleast 3 characters"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters"),
});

export const LOGIN_SCHEMA = yup.object().shape({
  username: yup.string().required("!"),
  password: yup.string().required("!"),
});

export const EDIT_ACCOMMONDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required("Please enter a accommodation name")
    .min(5, "Value must be atleast 5 characters long"),
  description: yup
    .string()
    .required("Please enter a description")
    .min(50, "Value must be atleast 50 characters long"),
  address: yup
    .string()
    .required("Please enter a address")
    .min(5, "Value must be atleast 5 characters long"),
  city: yup
    .string()
    .required("Please enter city name")
    .min(3, "Value must be atleast 3 characters long"),
  zip_code: yup
    .string()
    .required("Please enter a zip code")
    .min(4, "Value must be atleast 4 characters long")
    .matches(/^[0-9]+$/, "Please enter only digits"),
  state: yup.string(),
  image: yup.mixed(),
  featured: yup.boolean(),
});
