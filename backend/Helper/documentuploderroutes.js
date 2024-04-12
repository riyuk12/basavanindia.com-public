const Router = require("express").Router();

const { upload, upload1 } = require("./upoladdocument");
const { uploadDocument } = require("./doucumentcontroller");
const { isAuthorized, authorizedRole } = require("../middlewere/isAuthorized");
Router.route("/image/upload").post(
  isAuthorized,
  authorizedRole("admin"),
  upload,
  uploadDocument
);
Router.route("/pdf/upload").post(
  isAuthorized,
  authorizedRole("admin"),
  upload1,
  uploadDocument
);

module.exports = Router;
