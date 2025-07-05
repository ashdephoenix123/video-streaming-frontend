// loginSchema.js
import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("email is required"),
  password: yup.string().required("password Field is required"),
});
