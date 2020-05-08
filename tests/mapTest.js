var db = require('../models/dbconnection');
var User = require('../models/map');
var assert = require('assert');

describe('create Map', async function() {
    describe('database', async function() {
      it('Should return True because map record Already Exists', async function() {
        var dbo = await db.get_dbo_instance(); 
        var newUser = User.createUser('Oda, Japan','');
        if(newUser) {
            
            return true
        } 
      });
    });
  });