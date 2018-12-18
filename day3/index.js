"use strict";
exports.__esModule = true;
// Advent of code day 3
var fs_1 = require("fs");
fs_1.readFile("input.txt", "utf8", advent);
var Rectangle = /** @class */ (function () {
    // The constructor parses the string-representation of one rectangle
    function Rectangle(rectangleString) {
        var rectStringArray;
        rectStringArray = rectangleString.split(" @ ");
        this.id = rectStringArray[0];
        rectStringArray = rectStringArray[1].split(",");
        this.paddingLeft = parseInt(rectStringArray[0]);
        rectStringArray = rectStringArray[1].split(": ");
        this.paddingTop = parseInt(rectStringArray[0]);
        rectStringArray = rectStringArray[1].split("x");
        this.width = parseInt(rectStringArray[0]);
        this.height = parseInt(rectStringArray[1]);
        // CoveredCoordinates will be used to answer part 2 of the day 3 challenge
        this.coveredCoordinates = [];
    }
    return Rectangle;
}());
function advent(error, input) {
    var stringArray = input.split("\n");
    var rectangleArray = [];
    // Create a Rectangle object for each rectangle-string-representation and put it in the rectangleArray
    for (var i = 0; i < stringArray.length; i++) {
        var newRectangle = new Rectangle(stringArray[i]);
        rectangleArray.push(newRectangle);
    }
    //Create a 1000 x 1000 representation of the fabric for Santa's uniform
    var fabricArray = [];
    for (var i = 0; i < 1000; i++) {
        fabricArray[i] = [];
        for (var j = 0; j < 1000; j++) {
            fabricArray[i].push(0);
        }
    }
    // For each rectangle, build a list of all coordinates used in that rectangle.
    for (var i = 0; i < rectangleArray.length; i++) {
        var paddingLeft = rectangleArray[i].paddingLeft - 1;
        var paddingTop = rectangleArray[i].paddingTop - 1;
        var coveredCoordinates = [];
        for (var j = paddingLeft; j < rectangleArray[i].width + paddingLeft; j++) {
            for (var k = paddingTop; k < rectangleArray[i].height + paddingTop; k++) {
                var newCoordinate = {
                    x: j + 1,
                    y: k + 1
                };
                coveredCoordinates.push(newCoordinate);
                rectangleArray[i].coveredCoordinates.push(newCoordinate);
            }
        }
        // For each coordinate used in the current rectangle, update the fabricArray
        for (var j = 0; j < coveredCoordinates.length; j++) {
            var x = coveredCoordinates[j].x;
            var y = coveredCoordinates[j].y;
            fabricArray[x][y]++;
        }
    }
    // This bit of code determines the answer to part 1 of the day 3 challenge
    var endResult = 0;
    for (var i = 0; i < fabricArray.length; i++) {
        for (var j = 0; j < fabricArray.length; j++) {
            if (fabricArray[i][j] > 1) {
                endResult++;
            }
        }
    }
    console.log(endResult);
    // To answer part 2 of the day 3 advent of code challenge, 
    // We'll loop through all square inches of the fabricArray again and check the coordinates in each rectangle.
    // If all the needed inches for a rectangle have a value of 1 in the fabricArray, 
    // that means that ONLY that rectangle covers that part of the fabric.
    for (var i = 0; i < rectangleArray.length; i++) {
        var rectangleIsIsolated = true;
        for (var j = 0; j < rectangleArray[i].coveredCoordinates.length; j++) {
            var x = rectangleArray[i].coveredCoordinates[j].x;
            var y = rectangleArray[i].coveredCoordinates[j].y;
            if (fabricArray[x][y] !== 1) {
                rectangleIsIsolated = false;
            }
        }
        if (rectangleIsIsolated) {
            console.log(rectangleArray[i].id);
        }
    }
}
