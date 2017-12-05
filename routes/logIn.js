/**
 * Created by Костя on 12/5/2017.
 */
var express = require('express');
var router = express.Router();

/* GET logIn page. */
router.get('/', function(req, res, next) {
    res.render('logIn', {title: "Security Cams App"});
});

module.exports = router;