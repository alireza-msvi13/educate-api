const yup = require("yup");

const objectIdSchema = yup.string().matches(/^[0-9a-fA-F]{24}$/, "Invalid ID");

module.exports = {
    objectIdSchema
}