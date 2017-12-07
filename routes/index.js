var express = require('express');
var hashService = require('../services/hash-service');
var router = express.Router();
const  mysql = require('mysql');
const db =  require("../data_access/db-config.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  //perform auth check
    if ( req.query.auth === "" || typeof  req.query.auth === 'undefined' ){
        res.redirect('/logIn');
    }
    else{
        res.render('index', { title: 'My Simple Cams' , hash: req.query.auth});
    }
  });



module.exports = router;
