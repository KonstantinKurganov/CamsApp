/**
 * Created by Костя on 12/12/2017.
 */
var express = require('express');
var router = express.Router(),
    session = require('express-session');


router.get('/', function (req, res) {
    req.session =  null;
    res.send("logout success!");
});

module.exports = router;