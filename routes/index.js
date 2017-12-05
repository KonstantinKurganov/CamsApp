var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //perform auth check
  if ( req.query.valid === 'true'){
      res.render('index', { title: 'My Simple Cams' , hash: 'c873dfb4e254e212fa78bac2d966b831'});
  }
  else{
    res.redirect('/logIn')
  }
});



module.exports = router;
