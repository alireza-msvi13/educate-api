const yup = require("yup");

const registerValidator = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email("Invalid email").required(),
  password: yup.string().min(8, "Password must be at least 8 characters").required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required(),
  name: yup.string().min(3, "Name must be at least 3 characters").max(40, "Name must not exceed 40 characters").required(),
  phone: yup.string(),
});

const loginValidator = yup.object().shape({
  identifier: yup.string().required(),
  password: yup.string().required(),
});

module.exports = {
  registerValidator,
  loginValidator,
};
