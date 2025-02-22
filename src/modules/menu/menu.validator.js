const yup = require("yup");
const { objectIdSchema } = require("../../util/objectIdSchema");


const createMenuValidator = yup.object().shape({
  title: yup.string().required(),
  href: yup.string().required(),
  parent: objectIdSchema.nullable(),
});

const removeMenuValidator = yup.object().shape({
  id: objectIdSchema.required(),
});

module.exports = {
  createMenuValidator,
  removeMenuValidator,
};
