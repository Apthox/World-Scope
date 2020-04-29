var game_model = require("../models/user.js");

/*

Login User Controller

Purpose : Use Model user.js to check it exists and grab UID, then return success and if successful pass back UID

*/

function arr_contains(arr, val) {
    return (arr.indexOf(val) > -1);
}

module.exports.loginUser = async function (req, res) {
    console.log("Login User Controller ========");

    let resp = {
        "success": true,
        "msg": ""
    }

    let keys = Object.keys(req.body);
    console.log(keys);

    if (!(arr_contains(keys, "username") && arr_contains(keys, "password"))) {
        resp["success"] = false;
        resp["msg"]= "Missing Parameters";
        res.json(resp);
        return;
    }

    let username = req.body.username;
    let password = req.body.password;

    let authenticated = await game_model.authenticate_user(username, password);

    if (!authenticated["success"]) {
        resp["success"] = false;
        resp["msg"] = "could not be authenicated";
        res.json(resp);
        return;
    }

    console.log("End of Controller ==========");

    resp["success"] = true;
    resp["UUID"] = authenticated["UUID"];

    res.json(authenticated);
}

module.exports.createUser =  function () {
    
}