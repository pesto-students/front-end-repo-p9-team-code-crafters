/* eslint-disable sonarjs/no-duplicate-string */
import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("invalid email")
    .lowercase()
    .trim()
    .email("email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password should be atleast 8 characters"),
});

export const signupSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().trim().required().email(),
  contact: yup
    .string()
    .trim()
    .required()
    .matches(/^\+?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,6}$/, {
      excludeEmptyString: true,
    }),
  password: yup.string().required(),
  dob: yup.date().required(),
  profile_img: yup.string().url(),
  pan: yup
    .string()
    .trim()
    .matches(/^([A-Za-z]){5}(\d){4}([A-Za-z])$/, {
      excludeEmptyString: true,
    }),
  aadhaar: yup
    .string()
    .trim()
    .matches(/^d{12}$/, {
      excludeEmptyString: true,
    }),
  bank_name: yup.string(),
  holder_name: yup.string(),
  ifsc: yup
    .string()
    .trim()
    .matches(/^\S{4}\d{7}$/, {
      excludeEmptyString: true,
    }),
  account_number: yup.string(),
});

export const resetPasswordSchema = yup.object().shape({
  user: yup.string().required(),
  code: yup.string().required(),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password should be atleast 8 characters"),
});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("password is required"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password should be atleast 8 characters"),
});
