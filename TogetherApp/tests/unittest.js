/**
 * Created by Nikita on 7/01/2016.
 */
var User = require('../models/user.js');
var userSchema = require('../schemas/userSchema.js');
var mongoose = require('mongoose');
var userCollection = mongoose.model('User', userSchema, "users");
var assert = require('assert');

describe('UnitTest', function() {

    it('Test Get User', function() {

        var querySpec = {

            query: "SELECT * FROM Users"
        };

        User.getUsers(function (users) {
            res.json({userlist: users});
            },function(err){
                console.log("we have an error!");
            }
        );

       /* var data = query.getObject("Users", ["*"]);
        var coll = util.format(collectionId, "Users");

        documentDB.getObjects(querySpec, coll).then(function (response) {

            assert.ok(true, "We got response back");

        }, function (error) {
            assert.false(false, "We got an error back");
        });*/
    });
    it('Test Userdetail', function() {


    })
});