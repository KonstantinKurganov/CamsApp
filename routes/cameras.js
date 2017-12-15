/**
 * Created by Костя on 12/12/2017.
 */
var express = require('express');
var apiService = require('../services/api-service');
var monitorService = require('../services/monitor-service');
var auth = require('../services/session-service');
var router = express.Router();
var bodyParser = require('body-parser');


/* GET cameras page. */
router.get('/', auth,function(req, res, next) {
    let auth = req.session.authHash;
    monitorService.getAllMonitorsView(auth)
        .then((monitors) => {
            res.render('cameras', { title: 'Список всех камер' , username: req.session.username, hash: auth, data: monitors });
            })
});

router.get('/:monitorId([0-9]*)/', auth,function(req, res, next) {
    let auth = req.session.authHash;
    res.render('cameraFullMode', { title: 'Изображение с камеры' , monitorId: req.params.monitorId , hash: auth});

});

router.get('/montage', auth,function(req, res, next) {
    let auth = req.session.authHash;
    apiService.getAllMonitors(auth)
        .then(function (resJson){
            res.render('montage', { title: 'Просмотр всех камер' , username: req.session.username, hash: auth, data: JSON.parse(resJson) });
        });
});


router.post('/changeState', auth,function(req, res, next) {
    let auth = req.session.authHash;
    let monitorId = req.body.monitorId;
    let value =req.body.value;

    console.log(monitorId,value);
    monitorService.changeMonitorState(auth,monitorId,value)
        .then((result)=>{
            res.send(result);
        })
        .catch( function (error){
            console.log(error);
        });

});


module.exports = router;