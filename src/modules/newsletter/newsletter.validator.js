const yup = require("yup");

const createNewsletterValidator = yup.object().shape({
  email: yup.string().email().required(),
});

module.exports = {
  createNewsletterValidator,
};
