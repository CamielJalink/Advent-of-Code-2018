"use strict";
exports.__esModule = true;
// Advent of code day 4
var fs_1 = require("fs");
fs_1.readFile("input.txt", "utf8", advent);
var Event = /** @class */ (function () {
    function Event(rawEventString) {
        var _a;
        var rawDateTime;
        _a = rawEventString.split("] "), rawDateTime = _a[0], this.eventString = _a[1];
        rawDateTime = rawDateTime.substring(1);
        rawDateTime = rawDateTime + ":00";
        console.log(rawDateTime);
        this.dateOfEvent = new Date(rawDateTime);
        console.log(this.dateOfEvent);
    }
    return Event;
}());
// Main function called when the program is started
function advent(error, input) {
    var inputArray = input.split("\n");
    var eventArray = [];
    for (var i = 0; i < inputArray.length; i++) {
        var event_1 = new Event(inputArray[i]);
        eventArray.push(event_1);
    }
    eventArray.sort(function (a, b) {
        if (a.dateOfEvent < b.dateOfEvent) {
            return -1;
        }
        if (a.dateOfEvent > b.dateOfEvent) {
            return 1;
        }
        return 0;
    });
    // console.log(eventArray);
}
