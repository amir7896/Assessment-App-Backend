const { check, validationResult } = require("express-validator");
const { STATUS_CODE, VALIDATION_ERRORS } = require("../../constants/index");

// Task validation ..
const taskValidation = [
  check("title")
    .notEmpty()
    .withMessage(VALIDATION_ERRORS.TASK_VALIDATION.title)
    .isString()
    .withMessage(`Title ${VALIDATION_ERRORS.TASK_VALIDATION.mustBeString}`),
  check("description")
    .notEmpty()
    .withMessage(VALIDATION_ERRORS.TASK_VALIDATION.description)
    .isString()
    .withMessage(
      `Description ${VALIDATION_ERRORS.TASK_VALIDATION.mustBeString}`
    ),

  (req, res, next) => {
    const errors = validationResult(req);
    const errorMessage = errors.array().map((error) => error.msg);
    if (!errors.isEmpty()) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, message: errorMessage[0] });
    }
    next();
  },
];

// Status validation ..
const statusValidation = [
  check("isComplete")
    .notEmpty()
    .withMessage(VALIDATION_ERRORS.TASK_VALIDATION.isComplete)
    .isBoolean()
    .withMessage(
      `IsComplete ${VALIDATION_ERRORS.TASK_VALIDATION.mustBeBoolean}`
    ),

  (req, res, next) => {
    const errors = validationResult(req);
    const errorMessage = errors.array().map((error) => error.msg);
    if (!errors.isEmpty()) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, messaage: errorMessage[0] });
    }
    next();
  },
];

module.exports = {
  taskValidation,
  statusValidation,
};
