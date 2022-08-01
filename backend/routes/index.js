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
module.exports = router;
