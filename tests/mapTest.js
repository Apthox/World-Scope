var db = require('../models/dbconnection');
var Map = require('../models/map');
var assert = require('assert');

describe('create Map', async function() {
    describe('database', async function() {
      it('Should return True because map record Already Exists', async function() {
        var dbo = await db.get_dbo_instance(); 
        var newMap = Map.create_map('Oda, Japan','Mining for other minerals, such as copper, then replaced silver as the..',35.1051464, 132.4365703);
        if(newMap) {
            console.log("Date Exists")
            return true
        } 
        return false
      });
    });
  });