const mapFolder = './maps/';
const fs = require('fs');
const mapModel = require('./../models/map');

function writeMapToDatabase(file) {

    let rawdata = fs.readFileSync(mapFolder + file);
    let map = JSON.parse(rawdata);
    
    console.log(map);
    mapModel.create_map(map);
}

fs.readdir(mapFolder, (err, files) => {
    if (err) {
        throw err;
    }

    files.forEach(file => {
        console.log(file);
        if (file.endsWith(".json")) {
            console.log("Writing to database");
            writeMapToDatabase(file);
        } else {
            console.log("Can't write this file to database");
        }
        
    });

    return;
});