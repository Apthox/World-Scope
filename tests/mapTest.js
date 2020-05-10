var db = require('../models/dbconnection');
var Map = require('../models/map');
var assert = require('assert');

describe('create Map', async function() {
    describe('database', async function() {
      it('Should return True because map record Already Exists', async function() {
        var dbo = await db.get_dbo_instance();
        var map = {
          "title": "Abu Dahbi, United Arab Emirates",
          "hint": "Its focus on oil exports and commerce is reflected by the skyline’s modern towers and shopping megacenters",
          "latitude": 24.458859,
          "longitude":54.3218521
      }
        var newMap = Map.create_map(map);
        if(newMap) {
            console.log("Map Exists")
            return true
        } 
        return false
      });
    });
  });