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

// Sign In
router.post('/sign-in', async function(req, res, next) {

  var error = [];

  if(req.body.emailFromFront == '' || req.body.passwordFromFront == '') {
    error.push('Un ou plusieurs champ(s) sont vide(s)')
  } else {
    var userFromFrontExist = await userModel.findOne({email: req.body.emailFromFront});
    var result = false;
    if(userFromFrontExist){
      result = true
    } else {
      error.push('Information(s) incorrecte(s)');
    }
  }

  res.json({result, userFromFrontExist, error})
})
module.exports = router;
