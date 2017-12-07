/**
 * Created by Костя on 12/7/2017.
 */
const db =  require("../data_access/db-config.js");
const mysql = require('mysql');
const md5 = require('js-md5');


function getHash(username)
{
    return new Promise(function(resolve, reject) {
        // The Promise constructor should catch any errors thrown on
        // this tick. Alternately, try/catch and reject(err) on catch.
        var connection = mysql.createConnection(db);
        var query_str =
            "Select password " +
            "from Users " +
            "Where (username = ?);";
        var query_var = [username];
        connection.query(query_str,query_var, function (err, rows, fields) {
            // Call reject on error states,
            // call resolve with results
            if (err) {
                return reject(err);
            }
            if (rows.length === 0){
                return reject( new Error("No such user in db!"));
            }
            else {
                resolve(rows[0].password);
            }

        });
    });
}


function calcHash(passHash,login){
        let d = new Date;
        let authKey = "trash94" + login + passHash + d.getHours() + d.getDate() + d.getMonth() + d.getYear();
        let authHash = md5(authKey);
        console.log(authHash);
        return authHash;
}


module.exports.getHash = getHash;
module.exports.calcHash = calcHash;