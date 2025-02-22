const yup = require("yup");
const { objectIdSchema } = require("../../util/objectIdSchema");


const removeUserValidator = yup.object().shape({
  id: objectIdSchema.required(),
});

const banUserValidator = yup.object().shape({
  id: objectIdSchema.required(),
});

const editUserValidator = yup.object().shape({
  username: yup.string(),
  email: yup.string().email("Invalid email"),
  password: yup.string().min(8, "Password must be at least 8 characters"),
  name: yup.string().min(3, "Name must be at least 3 characters").max(40, "Name must not exceed 40 characters"),
  phone: yup.string(),
  role: yup.string().oneOf(["ADMIN", "USER"], "Role must be either ADMIN or USER"),
  id: objectIdSchema.required(),
});

const updateUserValidator = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email("Invalid email").required(),
  password: yup.string().required().min(8, "Password must be at least 8 characters"),
  phone: yup.string().required().matches(/^09[0-9]{9}$/, "Invalid phone number"),
});

const changeUserRoleValidator = yup.object().shape({
  id: objectIdSchema.required(),
  role: yup.string().oneOf(["ADMIN", "USER"], "Role must be either ADMIN or USER").required(),
});

module.exports = {
  removeUserValidator,
  banUserValidator,
  editUserValidator,
  updateUserValidator,
  changeUserRoleValidator,
};
