/**
 * Created by Костя on 12/9/2017.
 */
var request = require('request');
const serverUrl = "http://195.133.1.227/zm/"

// todo.refactor this
function sendApiReqGet(reqUrl,hash){
    return new Promise(function(resolve, reject) {

        //request post request
        request({
                url: serverUrl+'index.php/',
                method: 'POST',
                qs: {
                    'auth': hash,
                    'action': 'login',
                    'view': 'console'
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',

                }
            },
            function (err, res) {
                if (err) {
                    console.log("it did not work: " + err)
                }

                // console.log(res.statusCode);//logs as 201 sucess
                // console.log("heres the cookie: " + res.headers['set-cookie']); //returns cookie in correct format
                var cookie = res.headers['set-cookie'].toString();
                var firstCookie = cookie.split(';')[0];
                // console.log(firstCookie);
                //requesting data
                request({
                        url: reqUrl,
                        method: "GET",
                        headers: {
                            'Cookie': firstCookie
                        }
                    }, function (err, response) {
                        console.log(response.body); // one of the headers says user is not authorised
                        resolve(response.body);
                    }
                )

            });
    });
}


function sendApiReqPost(reqUrl,hash,value){
    return new Promise(function(resolve, reject) {

        //request post request
        request({
                url: serverUrl+'/index.php/',
                method: 'POST',
                qs: {
                    'auth': hash,
                    'action': 'login',
                    'view': 'console'
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',

                }
            },
            function (err, res) {
                if (err) {
                    console.log("it did not work: " + err)
                }

                //.log(res.statusCode);//logs as 201 sucess
                //console.log("heres the cookie: " + res.headers['set-cookie']); //returns cookie in correct format
                var cookie = res.headers['set-cookie'].toString();
                var firstCookie = cookie.split(';')[0];
                //console.log(firstCookie);
                //requesting data
                request.post({
                    url: reqUrl,
                    body: `Enabled=${value}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cookie': firstCookie
                    }
                }, function (err, response) {

                    console.log(response.body);
                    resolve("Monitor state changed") ;
                })

            });
    });
}





function getAllMonitors (hash) {
   return sendApiReqGet(serverUrl+"api/monitors.json",hash)
}
function getAllEvents (hash) {
    return sendApiReqGet(serverUrl+"/api/events.json",hash)
}
function changeMonitorState (hash,monitorId,value) {
    return sendApiReqPost(serverUrl+`api/monitors/${monitorId}.json`,hash,value)
}

module.exports.getAllMonitors = getAllMonitors;
module.exports.getAllEvents = getAllEvents;
module.exports.changeMonitorState = changeMonitorState;