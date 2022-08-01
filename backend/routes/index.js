var express = require("express");
var router = express.Router();

var userModel = require("../models/users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});


/* GET Account Screen - Remplissage auto des inputs */
router.get('/account-screen/:token', async function(req, res) {
  var findUserBDDFromToken = await userModel.findOne({ token : req.params.token })

  res.json({ findUserBDDFromToken });
})

/* GET Account Screen - Se déconnecter */


/* GET Account Screen Overlay - Modifier mes informations */



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

// Reset password
router.post('/reset-password', async function(req, res, next) {

  var error = [];

  var emailFromFrontExist = await userModel.findOne({email: req.body.emailFromResetPassword});
  var passwordFromFront = req.body.passwordFromResetPassword;
  var passwordFromFrontConfirmed = req.body.passwordFromResetPasswordConfirmed;

  var result = false;

  if(emailFromFrontExist){
    if(passwordFromFront === passwordFromFrontConfirmed){
      result = true;
      await userModel.updateOne({password: passwordFromFront})
    }
  }
  // ne pas oublier de rajouter une chose dans le front, si result === true alors on ferme l'overlay
  // actuel et on rouvre celui de la connection, vu qu'on vient de changer notre mdp
  res.json({result})
})

module.exports = router;
