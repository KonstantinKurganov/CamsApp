var request = require('request');

var querystring = require('querystring');



//request post request
request({
        url: 'http://195.133.1.227/zm/index.php/',
        method: 'POST',
        qs:{
            'auth':'f95a1202c6438b485c976a2e7a2d8071',
            'action': 'login',
            'view' : 'console'
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',

        }},
    function(err, res) {
        if(err){
            console.log("it did not work: " + err)
        }

        console.log(res.statusCode);//logs as 201 sucess
        console.log("heres the cookie: "+res.headers['set-cookie']); //returns cookie in correct format
        var cookie = res.headers['set-cookie'].toString();
        var firstCookie = cookie.split(';')[0];
        console.log(firstCookie);
        //requesting data
        request({
                url: 'http://195.133.1.227/zm/api/events.json',
                method: "GET",
                headers: {
                    'Cookie':firstCookie
                }
            },function(err,response){
                console.log(response.body) // one of the headers says user is not authorised

            }
        )

    });

