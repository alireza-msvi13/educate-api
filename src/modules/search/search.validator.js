const yup = require("yup");

const searchValidator = yup.object().shape({
  value: yup.string().required(),
});

module.exports = {
  searchValidator,
};
