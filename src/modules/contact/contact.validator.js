const yup = require("yup");
const { objectIdSchema } = require("../../util/objectIdSchema");


const createContactValidator = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Invalid phone number").required(),
  body: yup.string().required(),
});

const answerValidator = yup.object().shape({
  email: yup.string().email().required(),
  answer: yup.string().required(),
});

const removeValidator = yup.object().shape({
  id: objectIdSchema.required(),
});

module.exports = {
  createContactValidator,
  answerValidator,
  removeValidator,
};
