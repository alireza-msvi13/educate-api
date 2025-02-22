const yup = require("yup");
const { objectIdSchema } = require("../../util/objectIdSchema");


const seeNotificationValidator = yup.object().shape({
  id: objectIdSchema.required(),
});

module.exports = {
  seeNotificationValidator,
};
