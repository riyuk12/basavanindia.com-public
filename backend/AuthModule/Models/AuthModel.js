const mongoose = require("mongoose");

const user = mongoose.model(
  "users",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },

      avtar: {
        type: String,
        default: "https//:userprofile.com",
      },

      password: {
        type: String,
      },
      isActive: {
        type: Boolean,
        default: true,
        required: true,
      },
      resetToken: {
        type: String,
      },
      resetTokenExperin: {
        type: Date,
      },

      role: {
        type: String,
        default: "user",
      },
    },
    { timestamps: true }
  )
);

module.exports = user;
