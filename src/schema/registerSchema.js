// registerSchema.js
import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password Field is required"),
  cpassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Password must match!"),
});
