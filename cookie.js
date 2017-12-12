var request = require('request');

request({
        url: 'https://yadi.sk/d/41_PtRZU3QYRWU',
        method: "GET",

    },function(err,response){

        var str = response.toString();
        var from = str.search('<div class="video-player__container"');
        var to =str.search('</iframe></div>');

        var newstr = str.substring(from,to);
        console.log(from,to,newstr);

    }
)

