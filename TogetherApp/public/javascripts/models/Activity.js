/**
 * Created by iman on 15/12/15.
 */
var Activity = function(name, zipcode, street, number, description, dateFrom, dateUntil, timestamp, username, matches){
    this.activityName = name;
    this.zipcode = zipcode;
    this.street = street;
    this.number = number;
    this.description = description;
    this.dateFrom = dateFrom;
    this.dateUntil = dateUntil;
    this.timestamp = timestamp;
    this.username = username;
    this.matches = matches;
};