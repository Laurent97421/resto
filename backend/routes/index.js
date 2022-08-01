var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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
