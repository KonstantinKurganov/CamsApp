/**
 * Created by Костя on 12/7/2017.
 */
const db =  require("../data_access/db-config.js");
const sql =  require("../data_access/sql-strings");
const mysql = require('mysql');
const md5 = require('js-md5');


function handleSql( sqlReq)
{
    return new Promise(function(resolve, reject) {
        // The Promise constructor should catch any errors thrown on
        // this tick. Alternately, try/catch and reject(err) on catch.
        var connection = mysql.createConnection(db);

        connection.query(sqlReq, function (err, rows, fields) {
            // Call reject on error states,
            // call resolve with results
            if (err) {
                return reject(err);
            }
            if (rows.length === 0){
                return reject( new Error("Empty response"));
            }
            else {
                resolve(rows);
            }

        });
    });
}

function checkUser(username,password){
    return handleSql(sql.getPassHash(password))
        .then( function (sqlResult){
            return  handleSql(sql.selectUserByPassHash(sqlResult[0][`PASSWORD('${password}')`]))
                   .then(
                       function(rows){
                           if(rows[0].username === username)
                               return rows[0].password;
                           else
                               throw (new Error("Credentials are invalid")) ;
                       }
                   )
        })
        .catch(function (error){
            throw (new Error("Credentials are invalid")) ;
        })
}

function calcHash(passHash,login){
        let d = new Date;
        let authKey = "trash94" + login + passHash + d.getHours() + d.getDate() + d.getMonth() + d.getYear();
        let authHash = md5(authKey);
        console.log(authHash);
        return authHash;
}


module.exports.checkUser = checkUser;
module.exports.calcHash = calcHash;