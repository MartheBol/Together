/**
 * Created by Marthe on 19/12/15.
 */
var mongoose = require('mongoose');

/*
var userSchema = mongoose.Schema({
    firstname : String,
    lastname : String,
    username : String,
    password : String,
    email: String,
    birthdate : Date,
    sex : String,
    zipcode : String,
    biography : String
});
*/
var userSchema = mongoose.Schema({
    username : String,
    firstname: String,
    lastname: String,
    password : String,
    email: String,
    zipcode: Number,
    sex: String,
    interests:Array,
    birthdate: String,
    biography: String
});
module.exports = userSchema;