const mongoose = require("mongoose");
const categoryValidator = require("../modules/category/category.validator");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


//* add yup validation method to mongoose statics
categorySchema.statics.validation = function (body) {
  return categoryValidator.validate(body, { abortEarly: false });
};

const model = mongoose.model("Category", categorySchema);

module.exports = model;
