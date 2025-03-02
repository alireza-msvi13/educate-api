const yup = require("yup");

const createTicketValidator = yup.object().shape({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Body is required"),
  priority: yup.number().required("Priority is required"),
  course: yup.string().notRequired(),
});

const getAnswerValidator = yup.object().shape({
  id: yup.string().required("Ticket ID is required"),
});

const setAnswerValidator = yup.object().shape({
  body: yup.string().required("Answer body is required"),
  ticketID: yup.string().required("Ticket ID is required"),
});

module.exports = {
  createTicketValidator,
  getAnswerValidator,
  setAnswerValidator,
};
