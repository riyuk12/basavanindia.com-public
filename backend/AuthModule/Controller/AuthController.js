const User = require("../Models/AuthModel");
const expressAsyncHandler = require("express-async-handler");
const { v1: uuidv1 } = require("uuid");
const moment = require("moment-timezone");
const {
  hashPassword,
  ComparePassword,
  DeleteToken,
  CreateToken,
} = require("../helper/AuthHelper");
const token = require("../Models/TokenModel");
const sendemail = require("../../Helper/Email");

const Registration = expressAsyncHandler(async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    if (confirmpassword !== password) {
      res.status(403).json({
        success: false,
        message: "your password not match confirmpassword",
      });
      return;
    }

    const UserData = await User.create({
      name,
      email,
      password: await hashPassword(password),
    });

    if (!UserData) {
      res.status(403).json({
        success: false,
        message: "your data not registred",
      });
      return;
    }

    console.log(UserData._id);

    UserData.save();

    res.status(200).json({
      success: true,
      message: "your data submit successfully",
      token: await CreateToken(UserData._id, "users"),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const Userlogin = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email: email });
    if (!userData) {
      res.status(403).json({
        success: false,
        message: "your email not match",
      });
      return;
    }

    if (await ComparePassword(userData.password, password)) {
      res.status(200).json({
        success: true,
        data: userData,
        token: await CreateToken(userData._id),
      });
    } else {
      res.status(403).json({
        success: false,
        message: "your email and password not match",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const ForgotPassword = expressAsyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email: email });
    if (!userData) {
      res.status(403).json({
        success: false,
        message: "your email not match",
      });
      return;
    }
    userData.resetToken = uuidv1();
    userData.resetTokenExperin = Date.now() + 72000;
    userData.save();

    await sendemail(userData.email, userData.resetToken);
    res.status(200).json({
      success: true,
      message: "you email successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const VerifyToken = expressAsyncHandler(async (req, res) => {
  try {
    const { token } = req.body;
    const userData = await User.findOne({
      resetToken: token,
      resetTokenExperin: { $gt: Date.now() },
    });
    if (!userData) {
      res.status(403).json({
        success: false,
        message: "your token not found",
      });
      return;
    }

    userData.resetToken = null;
    userData.resetTokenExperin = null;
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
});

const ResetPassword = expressAsyncHandler(async (req, res) => {
  try {
    const { token, password, confirmpassword } = req.body;
    const userData = await User.findOne({
      resetToken: token,
      resetTokenExperin: { $gt: Date.now() },
    });

    if (!userData) {
      res.status(403).json({
        success: false,
        message: "your token not found",
      });
      return;
    }

    if (confirmpassword !== password) {
      res.status(403).json({
        success: false,
        message: "your password not match confirmpassword",
      });
      return;
    }
    userData.password = await hashPassword(password);
    userData.resetToken = null;
    userData.resetTokenExperin = null;

    userData.save();

    res.status(200).json({
      success: true,
      message: "password succesfully changed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const getAlluser = expressAsyncHandler(async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      res.status(403).json({
        success: "users not found",
      });
      return;
    }
    const users = await userData.map(({ _id, name, email }) => ({
      _id,
      name,
      email,
    }));

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = {
  Registration,
  Userlogin,
  ForgotPassword,
  ResetPassword,
  VerifyToken,
  getAlluser,
};
