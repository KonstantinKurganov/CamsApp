/**
 * Created by Костя on 12/12/2017.
 */
/**
 * Created by Костя on 12/12/2017.
 */
var express = require('express');
var apiService = require('../services/api-service');
var auth = require('../services/session-service');
var router = express.Router();


/* GET cameras page. */
router.get('/', auth,function(req, res, next) {
    let auth = req.session.authHash;
    apiService.getAllEvents(auth)
        .then(function (resJson){

            var obj = JSON.parse(resJson);

            res.render('events', { title: 'Список всех событий' , username: req.session.username, hash: auth, data: obj });
        });


});



module.exports = router;