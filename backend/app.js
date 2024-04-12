var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./connection/mongoConnect");
var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.use("/api/auth", require("./Helper/documentuploderroutes"));
app.use("/api/auth", require("./AuthModule/routes/Authroutes"));
app.use("/api/auth", require("./MagzineUpload.js/Routes/magzineRoute"));

app.use((req, res) => res.status(200).send("App Started"));

module.exports = app;
