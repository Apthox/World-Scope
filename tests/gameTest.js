var db = require('../models/dbconnection');
var User = require('../models/game');
var assert = require('assert');


describe('create Game', async function() {
    describe('database', async function() {
      it('Should return false because user exists', async function() {
        var dbo = await db.get_dbo_instance(); 
        var newUser = User.createUser('','');
        if(newUser) {
            User.remove_user('UserTest1')
            return true
        } 
      });
    });
  });