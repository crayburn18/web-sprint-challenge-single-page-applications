import * as yup from "yup";

export default yup.object().shape({
  name: yup
    .string()
    .required("name is required")
    .min(2, "name must be at least 2 characters"),
  size: yup
    .string()
    .oneOf(['small', 'medium', 'large'], "size is required"),
  special: yup
    .string(),  
  pepperoni: yup.boolean(),
  sausage: yup.boolean(),
  olives: yup.boolean(),
  pineapple: yup.boolean(),
});