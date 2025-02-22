const yup = require("yup");

const createCourseValidator = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  cover: yup.object().shape({
    size: yup.number().max(30 * 1024 * 1024, "Image size must not exceed 30MB"),
    mimetype: yup.string().oneOf(["image/jpeg", "image/jpg", "image/png", "image/webp"], "Invalid image format").required(),
  }),
  shortName: yup.string().required(),
  price: yup.number().required().min(0),
  status: yup.string().required(),
  categoryID: yup.string().required().matches(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
});

const updateCourseValidator = yup.object().shape({
  cover: yup.object().shape({
    size: yup.number().max(30 * 1024 * 1024, "Image size must not exceed 30MB"),
    mimetype: yup.string().oneOf(["image/jpeg", "image/jpg", "image/png", "image/webp"], "Invalid image format"),
  }),
  price: yup.number().min(0),
  status: yup.string().oneOf(["start", "presell"], "Invalid status"),
  categoryID: yup.string().matches(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
});

const getOneValidator = yup.object().shape({
  params: yup.object().shape({
    shortName: yup.string().required(),
  }),
});

const createSessionValidator = yup.object().shape({
  title: yup.string().required(),
  time: yup.string().required(),
  free: yup.number().required().min(0).max(1),
  id: yup.string().required().matches(/^[0-9a-fA-F]{24}$/, "Invalid course ID"),
  video: yup
    .mixed()
    .required()
    .test("fileSize", "Video file size must not exceed 50MB", (value) => !value || value.size <= 50 * 1024 * 1024)
    .test("mimetype", "Invalid video format", (value) => !value || ["video/mp4", "video/webm", "video/mpeg"].includes(value.mimetype)),
});

const registerValidator = yup.object().shape({
  price: yup.number().required().min(0),
});

const getCategoryCoursesValidator = yup.object().shape({
  categoryName: yup.string().required(),
});

const removeCourseValidator = yup.object().shape({
  params: yup.object().shape({
    id: yup.string().required().matches(/^[0-9a-fA-F]{24}$/, "Invalid course ID"),
  }),
});

const removeSessionValidator = yup.object().shape({
  params: yup.object().shape({
    id: yup.string().required().matches(/^[0-9a-fA-F]{24}$/, "Invalid session ID"),
  }),
});

const getSessionInfoValidator = yup.object().shape({
  shortName: yup.string().required(),
  sessionID: yup.string().required().matches(/^[0-9a-fA-F]{24}$/, "Invalid session ID"),
});

const getRelatedValidator = yup.object().shape({
  shortName: yup.string().required(),
});

module.exports = {
  createCourseValidator,
  updateCourseValidator,
  getOneValidator,
  createSessionValidator,
  registerValidator,
  getCategoryCoursesValidator,
  removeCourseValidator,
  removeSessionValidator,
  getSessionInfoValidator,
  getRelatedValidator,
};
