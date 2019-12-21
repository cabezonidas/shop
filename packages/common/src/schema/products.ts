import { object, string } from "yup";

export const createProductSchema = object().shape({
  title: string()
    .min(1)
    .max(30)
    .required(),
  description: string()
    .max(255)
    .notRequired(),
});
