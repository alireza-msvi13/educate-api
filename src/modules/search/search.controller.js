const coursesModel = require("../../models/course");
const articlesModel = require("../../models/article");
const { searchValidator } = require("./search.validator");

exports.get = async (req, res, next) => {
  try {
    const { value } = await searchValidator.validate(req.params);
    const regex = new RegExp(value, "i");

    const allResultCourses = await coursesModel.find({
      name: regex,
    });
    const allResultArticles = await articlesModel.find({
      title: regex,
    });

    res.json({ allResultCourses, allResultArticles });
  } catch (error) {
    next(error);
  }
};
