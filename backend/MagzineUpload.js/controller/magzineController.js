const { magzine } = require("../Models/magzine");
const expressAsyncHandler = require("express-async-handler");

const Uploadmagzine = expressAsyncHandler(async (req, res) => {
  try {
    console.log(req.files);
    const Magzine = new magzine({
      category: req.body.category,
      subtitle: req.body.subtitle,
      title: req.body.title,
      images: req.body.images,
      pdfs: req.body.pdfs,
      creatrorId: req.user._id,
    });

    const MagzineData = await Magzine.save();
    res.status(200).json({
      success: true,
      message: "upload data successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const getAllmagzine = expressAsyncHandler(async (req, res) => {
  try {
    const magzineData = await magzine
      .find({ isActive: true })
      .populate("creatrorId", "name");
    if (!magzineData || magzineData.length === 0) {
      res.status(403).json({
        success: false,
        message: "magzine not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: magzineData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const serachMagzine = expressAsyncHandler(async (req, res) => {
  try {
    const serachTerm = req.body.serach;
    const MazineData = await magzine.find({
      isActive: true,
      $or: [
        { category: { $regex: new RegExp(serachTerm, "i") } },
        { title: { $regex: new RegExp(serachTerm, "i") } },
        { subtitle: { $regex: new RegExp(serachTerm, "i") } },
      ],
    });

    if (!MazineData || MazineData.length === 0) {
      res.status(400).json({
        success: false,
        message: "not found magzine",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: MazineData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const ApporvedMagzine = expressAsyncHandler(async (req, res) => {
  try {
    const { MagzineId, Apporved } = req.body;

    const MagzineData = await magzine.findById(MagzineId);
    if (!MagzineData) {
      res.status(403).json({
        success: false,
        message: "magzine not found",
      });
      return;
    }
    const updateMagzineData = await magzine.findByIdAndUpdate(
      MagzineData._id,
      { isActive: Apporved },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "magzine apporved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const getAllmagzineforadmin = expressAsyncHandler(async (req, res) => {
  try {
    const magzineData = await magzine.find().populate("creatrorId", "name");
    if (!magzineData || magzineData.length === 0) {
      res.status(400).json({
        success: false,
        message: "magzine not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: magzineData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
module.exports = {
  Uploadmagzine,
  getAllmagzine,
  serachMagzine,
  ApporvedMagzine,
  getAllmagzineforadmin,
};
