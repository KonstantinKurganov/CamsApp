var express = require('express');
var apiService = require('../services/api-service');
var auth = require('../services/session-service');
var router = express.Router();



/* GET home page. */
router.get('/', auth,function(req, res, next) {
    res.render('index', { title: 'Система видеонаблюдения' , username: req.session.username });
});



module.exports = router;
