import * as yup from "yup";

export const createFundraiserSchema = yup.object().shape({
  title: yup.string().required("invalid title"),
  description: yup.string().required("invalid description"),
  short_description: yup.string().required("invalid short description"),
  category: yup.string().required("invalid category"),
  target_amount: yup
    .number()
    .min(1, "target amount should be greater than 0")
    .required("invalid target amount"),
  target_date: yup.date().required("invalid target date"),
});

export const editFundraiserSchema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  short_description: yup.string(),
  category: yup.string(),
  target_amount: yup.number().min(1, "target amount should be greater than 0"),
  target_date: yup.date(),
  oldImageKey: yup.string(),
});
