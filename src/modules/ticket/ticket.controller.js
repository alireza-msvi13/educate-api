const ticketModel = require("../../models/ticket");

exports.create = async (req, res, next) => {
  try {
    await ticketModel.createValidation(req.body).catch((err) => {
      err.statusCode = 400;
      throw err;
    });
    const { title, priority, body, course } =
      req.body;

    const ticket = await ticketModel.create({
      title,
      body,
      priority,
      user: req.user._id,
      answer: 0,
      isAnswer: 0,
      course,
    });

    const mainTicket = await ticketModel
      .findOne({ _id: ticket._id })
      .populate("user");

    return res.status(201).json(mainTicket);
  } catch (error) {
    next(error);
  }
};

exports.userTickets = async (req, res, next) => {
  try {
    const tickets = await ticketModel
      .find({ user: req.user._id })
      .sort({ _id: -1 })
      .populate("user")
      .lean();

    if (!tickets) {
      return res.status(404).json({ message: "No Ticket Available!" });
    }
    let ticketsArray = [];

    tickets.forEach((ticket) => {
      if (ticket.isAnswer === 0) {
        ticketsArray.push({
          ...ticket,
          user: ticket.user.name,
        });
      }
    });

    return res.json(ticketsArray);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const tickets = await ticketModel
      .find({ isAnswer: 0 })
      .populate("user")
      .populate("course")
      .lean();

    if (!tickets) {
      return res.status(404).json({ message: "No Ticket Available!" });
    }
    let ticketsArray = [];

    tickets.forEach(async (ticket) => {
      if (ticket.isAnswer === 0) {
        ticketsArray.push({
          ...ticket,
          user: ticket.user.name,
          course: ticket.course ? ticket.course.name : null,
        });
      }
    });

    return res.json(ticketsArray);
  } catch (error) {
    next(error);
  }
};

exports.getAnswer = async (req, res, next) => {
  try {
    await ticketModel.getAnswerValidation(req.params).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const { id } = req.params;
    const answerTicket = await ticketModel.findOne({ parent: id });
    const ticket = await ticketModel.findOne({ _id: id });
    if (!ticket) {
      return res.status(404).json({ message: "recheck the ID!" });
    }

    res.json({
      ticket: ticket.body,
      answer: answerTicket ? answerTicket.body : null,
    });
  } catch (error) {
    next(error);
  }
};

exports.setAnswer = async (req, res, next) => {
  try {
    await ticketModel.setAnswerValidation(req.body).catch((err) => {
      err.statusCode = 400;
      throw err;
    });
    const { body, ticketID } = req.body;

    const ticket = await ticketModel.findOne({ _id: ticketID }).lean();
    if (!ticket) {
      return res.status(404).json({ message: "Ticket Not Found!" });
    }

    const answer = await ticketModel.create({
      title: ticket.title,
      body,
      parent: ticketID,
      priority: ticket.priority,
      user: req.user._id,
      isAnswer: 1,
      answer: 0,
    });

    const updatedTicket = await ticketModel.findOneAndUpdate(
      { _id: ticket._id },
      {
        answer: 1,
      }
    );

    return res.json(answer);
  } catch (error) {
    next(error);
  }
};