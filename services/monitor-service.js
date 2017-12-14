/**
 * Created by Костя on 12/14/2017.
 */
var apiService = require('../services/api-service');

function getAllMonitorsView (hash){
     return apiService.getAllMonitors(hash)
        .then( function (resJson){
            var monitors = [];
            resJson = JSON.parse(resJson);
            if (resJson.hasOwnProperty("monitors")){

                for(var monitor of resJson.monitors )
                {
                    var monitorViewObj = {
                        id: monitor.Monitor.Id,
                        name: monitor.Monitor.Name,
                        function: translate(monitor.Monitor.Function),
                        enabled: monitor.Monitor.Enabled,
                    };
                    monitors.push(monitorViewObj);
                }
                return monitors;
            }
            else return monitors;
            })
}

function translate (monitorState){
    switch (monitorState){
        case 'Modect':
            return 'Распознавание';break;
        case 'None':
            return 'Отключен';break;
        case 'Monitor':
            return 'Наблюдение';break;
        case 'Record':
            return 'Запись';break;
    }
}

module.exports.getAllMonitorsView = getAllMonitorsView;