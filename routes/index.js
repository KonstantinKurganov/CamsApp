var express = require('express');
var apiService = require('../services/api-service');
var router = express.Router();
const  mysql = require('mysql');



/* GET home page. */
router.get('/', function(req, res, next) {
  //perform auth check
    if ( req.query.auth === "" || typeof  req.query.auth === 'undefined' ){
        res.redirect('/logIn');
    }
    else{
        let auth = req.query.auth;
        apiService.getAllEvents(auth)
            .then(function (resJson){

                var obj =  JSON.parse(resJson);
                console.log(obj['events'][0].Event.Name);
                for (var event in obj)
                {
                    console.log(event.Id);
                }


                res.render('index', { title: 'My Simple Cams' , hash: auth, data: JSON.parse(resJson) });
            });


    }
  });



module.exports = router;
