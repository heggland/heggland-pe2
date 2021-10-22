import * as yup from "yup";

export const SEARCH_SCHEMA = yup.object().shape({
  search: yup.string().required("Please type something"),
});

export const ENQUIRY_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Name must be atleast 3 characters"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  phone: yup
    .number()
    .required("Please enter a phone number")
    .min(10000000, "Please enter at least 8 numbers"),
  message: yup.string().max(200, "Message must be less than 200 characters"),
  people: yup.number().required("Please choose an option"),
  rooms: yup.number().required("Please choose an option"),
  date_from: yup.string().required("Please pick a date"),
  date_to: yup.string().required("Please pick a date"),
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
  username: yup
    .string()
    .required("Please enter a username")
    .min(3, "Username must be at least 3 characters long"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters long"),
});
