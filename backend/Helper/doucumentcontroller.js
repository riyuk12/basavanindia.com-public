const expressAsyncHandler = require("express-async-handler");
const path = require("path");
const uploadDocument = expressAsyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      res.status(403).json({
        success: false,
        message: "not upload document",
      });
      return;
    }
    const normalizedPath = path.normalize(req.file.path);

    // File ka naam nikalein

    // File ke bina path ka extract karein
    res.status(200).json({
      success: true,
      filename: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = { uploadDocument };
