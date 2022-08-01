var express = require("express");
var router = express.Router();

var userModel = require("../models/users");

var bcrypt = require("bcrypt");
var uid2 = require("uid2");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* Post Sign-up */

router.post("/sign-up", async function (req, res, next) {
  const hash = bcrypt.hashSync(req.body.signUpPassword, 10);

  var userTaken = await usersModel.findOne({
    userEmail: req.body.emailFromFront,
  });

  var error = [];
  var result = false;
  var token = "";

  if (
    req.body.firstNameFromFront == "" ||
    req.body.nameFromFront == "" ||
    req.body.phoneFromFront == "" ||
    req.body.emailFromFront == "" ||
    req.body.passwordFromFront == ""
  ) {
    error.push("Empty field...");
  } else if (userTaken) {
    error.push("Email already taken");
  } else {
    var newUser = new userModel({
      userName: req.body.firstNameFromFront,
      userFirstName: req.body.nameFromFront,
      userPassword: hash,
      userEmail: req.body.emailFromFront,
      userPhone: req.body.phoneFromFront,
      token: uid2(32),
    });

    var userSave = await newUser.save();
    if (userSave) {
      result = true;
      token = userSave.token;
    }
  }
  res.json({ result, userSave, token, error });
});

// Sign In
router.post("/sign-in", async function (req, res, next) {
  var error = [];

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    error.push("Un ou plusieurs champ(s) sont vide(s)");
  } else {
    var userFromFrontExist = await userModel.findOne({
      email: req.body.emailFromFront,
    });
    var result = false;
    if (userFromFrontExist) {
      result = true;
    } else {
      error.push("Information(s) incorrecte(s)");
    }
  }

  res.json({ result, userFromFrontExist, error });
});
module.exports = router;
