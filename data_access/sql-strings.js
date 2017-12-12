/**
 * Created by Костя on 12/11/2017.
 */

function getPassHash(pass){
    return "SELECT PASSWORD('" + pass + "');"
}

function selectUserByPassHash(pass){
    return `Select password,username from Users Where password = "${pass}";`;
}

module.exports.getPassHash = getPassHash;
module.exports.selectUserByPassHash = selectUserByPassHash;