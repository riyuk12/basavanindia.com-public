const { body } = require("express-validator");

const validateMagazineCreation = [
  // Validate category
  body("category").notEmpty().withMessage("Category is required"),

  // Validate subtitle
  body("subtitle").notEmpty().isString().withMessage("Subtitle is required"),

  // Validate title
  body("title").notEmpty().withMessage("Title is required"),

  // Validate images (assuming it's a file upload)

  body("images").notEmpty().isString().withMessage("images is required"),
  body("pdfs").notEmpty().isString().withMessage("pdfs is required"),
];
const serchvalidation = [
  body("serach").notEmpty().isString().withMessage("search is required"),
];
const ApporvedMagzinevalidation = [
  body("MagzineId")
    .notEmpty()
    .isMongoId()
    .withMessage("Magzine id is required"),
  body("Apporved").notEmpty().isBoolean().withMessage("Approved is requied"),
];
module.exports = {
  validateMagazineCreation,
  serchvalidation,
  ApporvedMagzinevalidation,
};
