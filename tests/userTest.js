//remove items after test completed

var db = require('../models/dbconnection');
var User = require('../models/user');
var assert = require('assert');


describe('create user', async function() {
    describe('database', async function() {
      it('Should return true if user was created after remove user from db', async function() {
        var dbo = await db.get_dbo_instance(); 
        var newUser = User.createUser('UserTest1','UserTest1');
        if(newUser) {
            User.remove_user('UserTest1')
            return true
        }
        
      });
    });
  });





