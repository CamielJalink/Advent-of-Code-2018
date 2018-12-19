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
        this.dateOfEvent = new Date(rawDateTime);
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
    // Hieronder ben ik gebleven
    var orderedEventArray = [];
    eventArray.forEach(function (event) {
        for (var i = 0; i < eventArray.length; i++) {
            if (event.dateOfEvent > eventArray[i].dateOfEvent) {
            }
        }
    });
    console.log(eventArray);
}
// Program plans:
// Sort all 'events' based on their year, month, day, hour and minutes
// 1518-05-27 23:59   is later dan 1518-05-27 00:01
// Dus misschien alles samen als number parsen door alle tekens eraf te halen? 
// Een shift class die events bekijkt die bij elkaar horen? OF is dat niet relevant?
// Ik wil alle minuten tellen. Shift is obvious als alles netjes op een rijtje staat adhv wie active is.
