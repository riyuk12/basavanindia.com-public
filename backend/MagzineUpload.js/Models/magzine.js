const mongoose = require("mongoose");

const MagzineData = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
      required: true,
    },

    images: {
      type: String,
      required: true,
    },
    pdfs: {
      type: String,
      required: true,
    },
    creatrorId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "users",
    },

    isActive: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

const magzine = mongoose.model("magzine", MagzineData);

module.exports = { magzine };
