const Router = require("express").Router();
const {
  isAuthorized,
  authorizedRole,
} = require("../../middlewere/isAuthorized");
const {
  Registration,
  Userlogin,
  ForgotPassword,
  ResetPassword,
  getAlluser,
} = require("../Controller/AuthController");

const { Validation } = require("../../Helper/Validation");
const {
  validateRegistration,
  validateForget,
  ResetPasswordValidation,
  LoginValidation,
} = require("../validation/authValidation");
Router.route("/user/registration").post(
  [validateRegistration, Validation],
  Registration
);
Router.route("/user/login").post([LoginValidation, Validation], Userlogin);
Router.route("/user/forgot").post([validateForget, Validation], ForgotPassword);
Router.route("/user/reset").post(
  [ResetPasswordValidation, Validation],
  ResetPassword
);
Router.route("/getall/user").get(
  isAuthorized,
  authorizedRole("admin"),
  getAlluser
);

module.exports = Router;
