const expressAsyncHandler = require("express-async-handler");

const { DecodeToken, VerifyToken } = require("../Helper/TokenHelper");

const User = require("../AuthModule/Models/AuthModel");
const token = require("../AuthModule/Models/TokenModel");

const isAuthorized = expressAsyncHandler(async (req, res, next) => {
  try {
    // let type =req.headers.type

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      let req_token = req.headers.authorization.split(" ")[1];
      if (await VerifyToken(req_token)) {
        let userId = await DecodeToken(req_token).payload.id;
        let token_data = await token.findOne({
          token: req_token,
          user: userId,
        });
        if (!token_data) {
          res.status(403).json({
            success: false,
            message: "your token not found",
          });
          return;
        }
        await User.findById(userId)
          .then((result) => {
            if (!result) {
              res.status(403).json({
                success: false,
                message: "your token not found",
              });
              return;
            }

            if (!result.isActive) {
              res.status(403).json({
                success: false,
                message: "your token not found",
              });
              return;
            }
            req.user = result;
            req.req_token = req_token;
            next();
          })
          .catch((error) => {
            res.status(401).json({
              success: false,
              message: error.message,
            });
          });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "token not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const authorizedRole = (...roles) => {
  return async (req, res, next) => {
    try {
      // Assuming req.user is populated by a previous middleware
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "User does not have the required role",
        });
      }
      next();
    } catch (error) {
      // Handle any errors that might occur
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};

module.exports = authorizedRole;

module.exports = { isAuthorized, authorizedRole };
