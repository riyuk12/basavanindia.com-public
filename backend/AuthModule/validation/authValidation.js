const { body } = require("express-validator");
const validateRegistration = [
  // Validate name
  body("name").notEmpty().withMessage("Name is required"),

  // Validate email
  body("email").isEmail().withMessage("Invalid email address"),

  // Validate password
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const validateForget = [
  body("email").isEmail().withMessage("Invalid email address"),
];

const ResetPasswordValidation = [
  body("token").isLength(8).withMessage("only provide 8 digit"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const LoginValidation = [
  body("email").isEmail().withMessage("Invalid email address"),

  // Validate password
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
module.exports = {
  validateRegistration,
  validateForget,
  ResetPasswordValidation,
  LoginValidation,
};
