const yup = require("yup");
const { objectIdSchema } = require("../../util/objectIdSchema");


const createCommentValidator = yup.object().shape({
  body: yup.string().required(),
  courseShortName: yup.string().required(),
  score: yup.number().integer().min(1, "Minimum score is 1").max(5, "Maximum score is 5").required(),
});

const answerCommentValidator = yup.object().shape({
  body: yup.string().required(),
});

const commentIdValidator = yup.object().shape({
  id: objectIdSchema.required(),
});

module.exports = {
  createCommentValidator,
  answerCommentValidator,
  commentIdValidator,
};
