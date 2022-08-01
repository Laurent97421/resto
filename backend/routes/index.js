var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Account Screen - Remplissage auto des inputs */
router.get('/account-screen/:token', async function(req, res) {
  var findUserBDDFromToken = await userModel.findOne({ token : req.params.token })

  res.json({ findUserBDDFromToken });
})

/* GET Account Screen - Se déconnecter */


/* GET Account Screen Overlay - Modifier mes informations */


module.exports = router;
