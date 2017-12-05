/**
 * Created by Костя on 12/5/2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET logIn page. */
router.get('/', function(req, res, next) {
    res.render('logIn', {title: "Security Cams App" , message: {error: false}});
});

router.post('/', function(req, res, next) {
    console.log("Username: " + req.body.username);
    res.redirect('/index')
});

module.exports = router;