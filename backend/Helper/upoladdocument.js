const multer = require("multer");
const path = require("path");
const express = require("express");
const Route = express();
Route.use(express.json());
Route.use(express.urlencoded({ extended: true }));
Route.use(express.static("public"));

const ImagesUpload = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/image"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const uploadimage = multer({
  storage: ImagesUpload,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      return cb(new Error("Only JPG and PNG files are allowed"));
    }

    cb(null, true);
  },
});

const PdfUpload = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/pdf"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + "-" + file.originalname.replace(ext, "") + ".pdf";
    cb(null, name);
  },
});

const uploadPdf = multer({
  storage: PdfUpload,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

const upload1 = uploadPdf.single("pdf"); // 'pdf' is the
const upload = uploadimage.single("image");

module.exports = { upload, upload1 };
