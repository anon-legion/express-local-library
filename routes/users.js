var express = require('express');
var router = express.Router();

router.get('/cool/', function(req, res, next) {
  res.send('You are one cool mofo!');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource foo bar');
});

module.exports = router;
