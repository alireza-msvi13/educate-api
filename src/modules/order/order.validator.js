const yup = require("yup");
const { objectIdSchema } = require("../../util/objectIdSchema");


const getOneValidator = yup.object().shape({
  id: objectIdSchema.required(),
});

module.exports = {
  getOneValidator,
};
