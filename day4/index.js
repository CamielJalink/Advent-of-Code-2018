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
        this.totalMinutesAsleep = 0;
        this.sleepArray = [];
        this.id = id;
        for (var i = 0; i < 60; i++) {
            this.sleepArray.push(0);
        }
    }
    Guard.prototype.updateSleep = function (startMinute, duration) {
        this.totalMinutesAsleep += duration;
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
    // Loop through all events and determine active guard and their sleep pattern
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
            // If it's a new guard, create a new guard object.
            if (isNewGuard) {
                var guard = new Guard(guardId);
                guardArray.push(guard);
                activeGuard = guard;
            }
        }
        // If a guard wakes up, check the previous event for sleep and determine sleep start and duration.
        if (eventArray[i].eventString.indexOf("wakes up") !== -1) {
            if (eventArray[i - 1].eventString.indexOf("falls asleep") !== -1) {
                var sleepStart = eventArray[i - 1].dateOfEvent.getUTCMinutes();
                var sleepDuration = eventArray[i].dateOfEvent.getUTCMinutes() - sleepStart;
                activeGuard.updateSleep(sleepStart, sleepDuration);
            }
        }
    }
    // This part of the code is only relevant for part A of the challenge
    var mostSleepyGuard = guardArray[0];
    for (var i = 1; i < guardArray.length; i++) {
        if (guardArray[i].totalMinutesAsleep > mostSleepyGuard.totalMinutesAsleep) {
            mostSleepyGuard = guardArray[i];
        }
    }
    var minuteMostAsleep = 0;
    var timesAsleep = 0;
    for (var i = 0; i < mostSleepyGuard.sleepArray.length; i++) {
        if (mostSleepyGuard.sleepArray[i] > timesAsleep) {
            minuteMostAsleep = i;
            timesAsleep = mostSleepyGuard.sleepArray[i];
        }
    }
    console.log("Answer part A = " + minuteMostAsleep * parseInt(mostSleepyGuard.id));
    //-----------------------------------------------------------------------
    // This part of the code is only relevant for part B of the challenge
    minuteMostAsleep = 0;
    timesAsleep = 0;
    var targetGuard = guardArray[0];
    for (var i = 0; i < guardArray.length; i++) {
        for (var j = 0; j < guardArray[i].sleepArray.length; j++) {
            if (guardArray[i].sleepArray[j] > timesAsleep) {
                minuteMostAsleep = j;
                timesAsleep = guardArray[i].sleepArray[j];
                targetGuard = guardArray[i];
            }
        }
    }
    console.log("Answer part B = " + minuteMostAsleep * parseInt(targetGuard.id));
}
