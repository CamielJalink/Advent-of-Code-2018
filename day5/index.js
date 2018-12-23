"use strict";
exports.__esModule = true;
// Advent of code day 5
var fs_1 = require("fs");
fs_1.readFile("input.txt", "utf8", advent);
// Main function called when the program is started
function advent(error, inputString) {
    console.log("Answer part one: " + resolveString(inputString));
    // Check which characters are present in the inputString.
    // This code could be replaced by a hardcoded array of all the (lowercase) alphabet letters.
    var polymerCharArray = [];
    for (var i = 0; i < inputString.length; i++) {
        if (polymerCharArray.indexOf(inputString[i].toLowerCase()) === -1) {
            polymerCharArray.push(inputString[i].toLowerCase());
        }
    }
    // For each unique lowercase character, build a string with that polymer
    var shortestResult = 0;
    polymerCharArray.forEach(function (char) {
        var alteredInput = inputString;
        for (var i = 0; i < alteredInput.length; i++) {
            if (alteredInput[i].toLowerCase() === char) {
                var remainsLeft = alteredInput.slice(0, i);
                var remainsRight = alteredInput.slice(i + 1);
                alteredInput = remainsLeft + remainsRight;
                i--;
            }
        }
        if (shortestResult === 0 || shortestResult > resolveString(alteredInput)) {
            shortestResult = resolveString(alteredInput);
        }
    });
    console.log("Answer part two: " + shortestResult);
}
function resolveString(input) {
    for (var i = 1; i < input.length; i++) {
        if (input[i] !== input[i - 1] && (input[i] === input[i - 1].toUpperCase() || input[i].toUpperCase() === input[i - 1])) {
            var remainsLeft = input.slice(0, i - 1);
            var remainsRight = input.slice(i + 1);
            input = remainsLeft + remainsRight;
            // Set index i back to check for newly formed removeable pairs.
            if (i > 1) {
                i = i - 2;
            }
            else {
                i = i - 1;
            }
        }
    }
    return input.length;
}
