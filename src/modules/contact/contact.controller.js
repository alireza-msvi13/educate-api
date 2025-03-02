const contactModel = require("../../models/contact");
var nodemailer = require("nodemailer");

exports.create = async (req, res, next) => {
  try {
    await contactModel.createValidation(req.body).catch((err) => {
      err.statusCode = 400;
      throw err;
    });
    const { name, email, phone, body } = req.body;

    const newcontact = await contactModel.create({
      name,
      email,
      phone,
      body,
      answer: 0,
    });

    return res.status(201).json(newcontact);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const allcontacts = await contactModel.find();
    res.json(allcontacts);
  } catch (error) {
    next(error);
  }
};

exports.asnwer = async (req, res, next) => {
  try {
    await contactModel.answerValidation(req.body).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const { email, answer } = req.body;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "",
        pass: "",
      },
    });

    var mailOptions = {
      from: "",
      to: email,
      subject: "",
      text: answer,
    };

    const contact = await contactModel.findOneAndUpdate(
      { email: email },
      {
        answer: 1,
      }
    );

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.json({ message: error });
      } else {
        res.json({ message: "Email sent succesfully" });
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await contactModel.removeValidation(req.params).catch((err) => {
      err.statusCode = 400;
      throw err;
    });
    const deletedContact = await contactModel.findOneAndRemove({
      _id: req.params.id,
    });
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact Not Found!" });
    }
    return res.json(deletedContact);
  } catch (error) {
    next(error);
  }
};
