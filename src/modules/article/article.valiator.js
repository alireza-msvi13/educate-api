const yup = require("yup");
const { objectIdSchema } = require("../../util/objectIdSchema");

//* article schema
exports.articleValidator = yup.object().shape({
  title: yup.string().trim().required(),
  description: yup.string().required(),
  body: yup.string().required(),
  shortName: yup.string().trim().required(),
  cover: yup.object().shape({
    size: yup.number().max(30 * 1024 * 1024, "Image size must not exceed 30MB"),
    mimetype: yup
      .string()
      .oneOf(["image/jpeg", "image/jpg", "image/png", "image/webp"], "Invalid image format")
      .required(),
  }),
  categoryID: objectIdSchema.required(),
});
