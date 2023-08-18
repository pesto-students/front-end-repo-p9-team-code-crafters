import * as yup from "yup";

export const userInformationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().trim().required().email(),
  contact: yup
    .string()
    .trim()
    .required()
    .matches(/^\+?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,6}$/, {
      excludeEmptyString: true,
    }),
  dob: yup.date().required(),
});

export const userDetailsSchema = yup.object().shape({
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
  bank_name: yup.string().required(),
  holder_name: yup.string().required(),
  ifsc: yup.string().trim().required(),
  account_number: yup.string().required(),
});
