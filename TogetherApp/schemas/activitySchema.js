/**
 * Created by Nikita on 28/12/2015.
 */
var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({
    activityName: String,
    zipcode : String,
    street: String,
    number: String,
    description : String,
    fromDate: String,
    untilDate: String,
    image: String,
    timestamp:String,
    user: String,
    matches:Array,
    timeFrom: String,
    timeUntil: String

});
module.exports = activitySchema;