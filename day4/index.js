"use strict";
exports.__esModule = true;
// Advent of code day 4
var fs_1 = require("fs");
fs_1.readFile("input.txt", "utf8", advent);
var Event = /** @class */ (function () {
    function Event(rawEventString) {
        var _a, _b, _c;
        var rawString, rawDate, rawTime;
        var stringYear, stringMonth, stringDay;
        _a = rawEventString.split("] "), rawString = _a[0], this.eventString = _a[1];
        // remove the "["
        rawString = rawString.substring(1);
        _b = rawString.split(" "), rawDate = _b[0], rawTime = _b[1];
        _c = rawDate.split("-"), stringYear = _c[0], stringMonth = _c[1], stringDay = _c[2];
        this.year = parseInt(stringYear);
        this.month = parseInt(stringMonth);
        this.day = parseInt(stringDay);
        // PROBLEEM: parseint laat voorloopnullen weglopen, dus ik wil deze integers als string. 
        console.log(this.year);
        console.log(this.month);
        console.log(this.day);
    }
    return Event;
}());
function advent(error, input) {
    var inputArray = input.split("\n");
    var eventArray = [];
    for (var i = 0; i < inputArray.length; i++) {
        var event_1 = new Event(inputArray[i]);
        eventArray.push(event_1);
    }
    // console.log(eventArray); 
}
// Program plans:
// Sort all 'events' based on their year, month, day, hour and minutes
// 1518-05-27 23:59   is later dan 1518-05-27 00:01
// Dus misschien alles samen als number parsen door alle tekens eraf te halen? 
// Een shift class die events bekijkt die bij elkaar horen? OF is dat niet relevant?
// Ik wil alle minuten tellen. Shift is obvious als alles netjes op een rijtje staat adhv wie active is.
