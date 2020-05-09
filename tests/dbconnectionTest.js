//add items to db
//remove items after test completed

var db = require('../models/dbconnection');
var User = require('../models/user');
var assert = require('assert');


describe('Databse connection', async function() {
    describe('database', async function() {
      it('should return 1 if the databse is connected', async function() {
        var dbo = await db.get_dbo_instance(); 
        if(dbo) {
            return 1;
        }
        return 0;
      });
    });
  });


