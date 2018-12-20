"use strict";
exports.__esModule = true;
// Advent of code day 4
var fs_1 = require("fs");
fs_1.readFile("input.txt", "utf8", advent);
var Event = /** @class */ (function () {
    function Event(rawEventString) {
        var _a;
        this.dateOfEvent = new Date();
        var rawDateTime;
        _a = rawEventString.split("] "), rawDateTime = _a[0], this.eventString = _a[1];
        // Remove the [ in front of the rawDateTime string, and add "Z" for UTC time format.
        rawDateTime = rawDateTime.substring(1) + "Z";
        this.dateOfEvent = new Date(rawDateTime);
    }
    return Event;
}());
var Guard = /** @class */ (function () {
    function Guard(id) {
        this.events = [];
        this.totalMinutesAsleep = 0;
        this.sleepArray = [];
        this.id = id;
        for (var i = 0; i < 60; i++) {
            this.sleepArray.push(0);
        }
    }
    Guard.prototype.addEvent = function (event) {
        this.events.push(event);
    };
    Guard.prototype.updateSleep = function (startMinute, duration) {
        this.totalMinutesAsleep += duration;
        // 
        for (var i = startMinute; i < startMinute + duration; i++) {
            this.sleepArray[i]++;
        }
    };
    return Guard;
}());
// Main function called when the program is started
function advent(error, input) {
    var inputArray = input.split("\n");
    var eventArray = [];
    for (var i = 0; i < inputArray.length; i++) {
        var event_1 = new Event(inputArray[i]);
        eventArray.push(event_1);
    }
    // Sort all events so that the event with the oldest date is listed first.
    eventArray.sort(function (a, b) {
        if (a.dateOfEvent < b.dateOfEvent) {
            return -1;
        }
        if (a.dateOfEvent > b.dateOfEvent) {
            return 1;
        }
        return 0;
    });
    var guardArray = [];
    var activeGuard = new Guard(" ");
    for (var i = 0; i < eventArray.length; i++) {
        if (eventArray[i].eventString.indexOf("Guard #") !== -1) {
            var guardId = eventArray[i].eventString.split(" begins shift")[0].substring(7);
            var isNewGuard = true;
            // Is this a new guard?
            for (var j = 0; j < guardArray.length; j++) {
                if (guardArray[j].id == guardId) {
                    isNewGuard = false;
                    activeGuard = guardArray[j];
                }
            }
            // If it's a new guard, create it.
            if (isNewGuard) {
                var guard = new Guard(guardId);
                guardArray.push(guard);
                activeGuard = guard;
            }
        }
        activeGuard.addEvent(eventArray[i]);
    }
    guardArray.forEach(function (guard) {
        console.log(guard.events.length);
    });
    // Nu ik alle guards heb met al hun events, kan ik per guard bekijken welke minuten die slaapt,
    // 
    // En welke minuut hij het meeste in slaapt.
}
