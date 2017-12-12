/**
 * Created by Костя on 12/9/2017.
 */
var request = require('request');

function sendApiReq(reqUrl,hash){
    return new Promise(function(resolve, reject) {

        //request post request
        request({
                url: 'http://195.133.1.227/zm/index.php/',
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

                console.log(res.statusCode);//logs as 201 sucess
                console.log("heres the cookie: " + res.headers['set-cookie']); //returns cookie in correct format
                var cookie = res.headers['set-cookie'].toString();
                var firstCookie = cookie.split(';')[0];
                console.log(firstCookie);
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


function getAllMonitors (hash) {
   return sendApiReq("http://195.133.1.227/zm/api/monitors.json",hash)
}
function getAllEvents (hash) {
    return sendApiReq("http://195.133.1.227/zm/api/events.json",hash)
}



module.exports.getAllMonitors = getAllMonitors;
module.exports.getAllEvents = getAllEvents;