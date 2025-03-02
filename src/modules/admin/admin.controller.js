const courseModel = require("../../models/course");
const userModel = require("../../models/user");
const sessionModel = require("../../models/session");
const courseUserModel = require("../../models/course-user");

exports.getPAdmin = async (req, res, next) => {
  try {
    const coursesRegistersCount = await courseUserModel.find().lean().count();
    const coursesCount = await courseModel.find().lean().count();
    const sessionsCount = await sessionModel.find().lean().count();
    let users = await userModel.find().sort({ _id: -1 }).lean();

    const admin = await userModel.findOne({ _id: req.user._id });
    users = users.slice(0, 5);

    res.json({
      infos: [
        {
          count: coursesRegistersCount,
          title: "registers",
        },
        {
          count: coursesCount,
          title: "courses",
        },
        {
          count: sessionsCount,
          title: "sessions",
        },
      ],
      lastUsers: users,
      adminName: admin.name,
    });
  } catch (error) {
    next(error);
  }
};
