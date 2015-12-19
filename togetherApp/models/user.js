/**
 * Created by Marthe on 19/12/15.
 */
var mongoose = require('mongoose');
var userSchema = require('../schemas/userSchema.js');
var userCollection = mongoose.model('User', userSchema, "users");

userCollection.getUsers = function(callback){
    userCollection.find({}).sort('username').exec(function(err,docs){
        if(err){console.log(err);}
        callback(docs);
    })
};

module.exports = userCollection;