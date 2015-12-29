/**
 * Created by Nikita on 28/12/2015.
 */

var mongoose = require('mongoose');
var activitySchema = require('../schemas/activitySchema.js');
var activityCollection = mongoose.model('Activity', activitySchema, "activities");

activityCollection.getActivities = function(callback){
    activityCollection.find({}).sort('activityName').exec(function(err,docs){
        if(err){console.log(err);}
        callback(docs);
    })
};

module.exports = activityCollection;