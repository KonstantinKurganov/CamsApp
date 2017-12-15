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
                        alarm: false
                    };

                    monitors.push(monitorViewObj);


                }
                return monitors;
            }
            else return monitors;
            })
}

function changeMonitorState(hash,monitorId,value){
    return apiService.changeMonitorState(hash,monitorId,value)
        .then((result)=>{return result;}
        ).catch(function (error){
            throw (new Error("error while updating monitor")) ;
        })
}

function alarmMonitor(hash,monitorId,mode){
    return apiService.alarmMonitor(hash,monitorId,mode)
        .then((result)=>{return result;}
        ).catch(function (error){
            throw (new Error("error while alarming monitor")) ;
        })
}

// function checkMonitorForAlarm(monitorId,hash){
//     apiService.alarmMonitor(hash,monitorId,"status")
//         .then((result)=>{
//             if (!result.includes('0')){
//                 return true;
//             }
//             else {
//                 return false;
//             }
//         });
//
// }
//
// function checkAlarm (monitors,hash){
//     for(var monitor of monitors )
//     {
//         checkMonitorForAlarm(monitor.id,hash)
//             .then((result )=>{
//                 if(result)  {
//                     monitor.alarn = false;
//                 }
//                 else {
//                  monitor.alarn = true;
//                  }
//                  })
//
//     }
//     return monitors;
// }

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
module.exports.changeMonitorState = changeMonitorState;
module.exports.alarmMonitor = alarmMonitor;
//module.exports.checkAlarm = checkAlarm;