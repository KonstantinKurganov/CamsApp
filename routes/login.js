/**
 * Created by Костя on 12/5/2017.
 */
var express = require('express');
var hashService = require('../services/hash-service');
var router = express.Router();
const  mysql = require('mysql');
const db =  require("../data_access/db-config.js");
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var request = require('request');


/* GET logIn page. */
router.get('/', function(req, res, next) {
    res.render('login', {title: "Система видеонаблюдения" });
});

router.post('/',function(req, res, next) {

    let username = req.body.username;
    let pass = req.body.password;
    let authHash ="";


    hashService.checkUser(username,pass)
        .then( function (passHash){
            authHash = hashService.calcHash(passHash,username);

            req.session.authHash = authHash;
            req.session.username = username;

            res.redirect('/');
        })
        .catch( function (error){
            console.log(error);
            res.render('login', { title: 'Система видеонаблюдения', errors: [error]});


        });
});




module.exports = router;