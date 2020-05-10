const mapFolder = './maps/locations/';
const fs = require('fs');
const mapModel = require('./../models/map');

function writeMapToDatabase(file) {
    return new Promise(async(resolve, reject) => {
        let rawdata = fs.readFileSync(mapFolder + file);
        let map = JSON.parse(rawdata);

        console.log(map);
        await mapModel.create_map(map);
        resolve();
    });
}

fs.readdir(mapFolder, async(err, files) => {
    if (err) {
        throw err;
    }

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log(file);
        if (file.endsWith(".json")) {
            console.log("Writing to database");
            await writeMapToDatabase(file);
        } else {
            console.log("Can't write this file to database");
        }
    }

    return;
});