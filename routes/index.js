var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //perform auth check
  if ( 1 === 2){
      res.render('index', { title: 'My Simple Cams' , hash: 'a731be8e31d6b3313f3fb1a0d6567885'});
  }
  else{
    res.redirect('/logIn')
  }
});



module.exports = router;
