var express = require('express');
var apiService = require('../services/api-service');
var auth = require('../services/session-service');
var router = express.Router();



/* GET home page. */
router.get('/', auth,function(req, res, next) {

    let auth = req.session.authHash;
    apiService.getAllEvents(auth)
        .then(function (resJson){
            res.render('index', { title: 'My Simple Cams' , hash: auth, data: JSON.parse(resJson) });
        });
  });



module.exports = router;
