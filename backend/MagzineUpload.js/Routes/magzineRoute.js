const Router = require("express").Router();
const {
  Uploadmagzine,
  getAllmagzine,
  serachMagzine,
  ApporvedMagzine,
  getAllmagzineforadmin,
} = require("../controller/magzineController");
const {
  isAuthorized,
  authorizedRole,
} = require("../../middlewere/isAuthorized");

const { Validation } = require("../../Helper/Validation");
const {
  validateMagazineCreation,
  serchvalidation,
  ApporvedMagzinevalidation,
} = require("../Validation/MagzineValidation");
Router.route("/upload/magzine").post(
  [validateMagazineCreation, Validation],
  isAuthorized,
  authorizedRole("admin"),
  Uploadmagzine
);
Router.route("/all/magzine").get(getAllmagzine);
Router.route("/serch/magzine").get(
  [serchvalidation, Validation],
  serachMagzine
);
Router.route("/apporved/magzine").put(
  [ApporvedMagzinevalidation, Validation],
  isAuthorized,
  authorizedRole("superadmin"),
  ApporvedMagzine
);
Router.route("/getallmagzine/admin").get(
  isAuthorized,
  authorizedRole("superadmin"),
  getAllmagzineforadmin
);

module.exports = Router;
