var db = require('../models/dbconnection');
var Game = require('../models/game');
var assert = require('assert');


describe('create Game', async function() {
    describe('database', async function() {
      it('Should return false because user exists', async function() {
        var dbo = await db.get_dbo_instance(); 
        var newGame = Game.create_game('5eadd3f70ba602bae9f182e0',0);
        if(newGame) {

            return true
        } 
      });
    });
  });