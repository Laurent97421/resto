var express = require("express");
var router = express.Router();

var userModel = require("../models/users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* Post Sign-up */

router.post("/sign-up", async function (req, res, next) {
  var newUser = new userModel({});

  await newUser.save();
});
// });

module.exports = router;
