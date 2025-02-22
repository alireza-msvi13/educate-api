const yup = require("yup");
const { objectIdSchema } = require("../../util/objectIdSchema");


const percentSchema = yup
  .number()
  .min(0, "Discount percentage cannot be negative")
  .max(100, "Discount percentage cannot exceed 100");

const createOffValidator = yup.object().shape({
  code: yup.string().required(),
  percent: percentSchema.required(),
  course: objectIdSchema.required(),
  max: yup.number().min(1).required(),
});

const getOneOffValidator = yup.object().shape({
  code: yup.string().required(),
  course: objectIdSchema.required(),
});

const removeOffValidator = yup.object().shape({
  id: objectIdSchema.required(),
});

const setDiscountOnAllValidator = yup.object().shape({
  discount: percentSchema.required(),
});

module.exports = {
  getOneOffValidator,
  createOffValidator,
  removeOffValidator,
  setDiscountOnAllValidator,
};
