var express = require("express");
var router = express.Router();

var userModel = require("../models/users");

var bcrypt = require("bcrypt");
var uid2 = require("uid2");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET Account Screen - Remplissage auto des inputs */
router.get("/account-screen/:token", async function (req, res) {
  var findUserBDDFromToken = await userModel.findOne({
    token: req.params.token,
  });

  res.json({ findUserBDDFromToken });
});

/* GET Account Screen - Se déconnecter */

/* GET Account Screen Overlay - Modifier mes informations */

/* Post Sign-up */

/* Post Sign-up */

router.post("/signup", async function (req, res, next) {
  const hash = bcrypt.hashSync(req.body.passwordFromFront, 10);

  var userTaken = await userModel.findOne({
    userEmail: req.body.emailFromFront,
  });

  console.log(req.body.emailFromFront);

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
      userName: req.body.nameFromFront,
      userFirstName: req.body.firstNameFromFront,
      userEmail: req.body.emailFromFront,
      userPhone: req.body.phoneFromFront,
      userPassword: hash,
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

// });

// Sign In
router.post("/sign-in", async function (req, res, next) {
  var error = [];

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    console.log('PREMIER IF, INFOS VIDE')
    error.push("Un ou plusieurs champ(s) sont vide(s)");
  } else {
    console.log('SECOND IF, FINDONE')
    var userFromFrontExist = await userModel.findOne({
      userEmail: req.body.emailFromFront,
    });
    var result = false;
    if (userFromFrontExist) {
      result = true;
    } else {
      error.push("Information(s) incorrecte(s)");
    }
  }
    // var userFromFrontExist = await userModel.findOne({userEmail: req.body.emailFromFront});
    // console.log(userFromFrontExist)

  // à rajouter: if result === true, on le connecte, donc token et tout ça.
  // Si true: redirect vers  homescreen en sauvegardant le token pour la session


  // res.json({userFromFrontExist})
  res.json({result, userBDD: userFromFrontExist, error})
})


// Reset password
router.post("/reset-password", async function (req, res, next) {
  var error = [];

  var userFromFrontExist = await userModel.findOne({
    email: req.body.emailFromResetPassword,
  });
  var passwordFromFront = req.body.passwordFromResetPassword;
  var passwordFromFrontConfirmed = req.body.passwordFromResetPasswordConfirmed;
  var mailFromFront = req.body.emailFromResetPassword;

  var result = false;

  if (userFromFrontExist) {
    if (passwordFromFront === passwordFromFrontConfirmed) {
      result = true;
      await userModel.updateOne(
        { _id: userFromFrontExist._id },
        {
          mail: mailFromFront,
          password: passwordFromFront,
        }
      );
    }
  }
  // ne pas oublier de rajouter une chose dans le front, si result === true alors on ferme l'overlay
  // actuel et on rouvre celui de la connection, vu qu'on vient de changer notre mdp
  res.json({ result });
});


router.post("/account-screen", async function (req, res, next) {

  var userFromBDD = await userModel.findOne({token: req.body.tokenFromFront})
  console.log(userFromBDD)


  res.json({userFromBDD});
});

module.exports = router;
