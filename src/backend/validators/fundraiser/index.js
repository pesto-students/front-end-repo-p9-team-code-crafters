import * as yup from "yup";

export const createFundraiserSchema = yup.object().shape({
  title: yup.string().required("invalid title"),
});
