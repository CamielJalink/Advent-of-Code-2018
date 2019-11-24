"use strict";
exports.__esModule = true;
// Advent of code day 6
var fs_1 = require("fs");
fs_1.readFile("input.txt", "utf8", advent);
// deze class is nodig want: ik wil weten hoeveel punten hij 'bij zijn vlak' heeft. 
var Coordinate = /** @class */ (function () {
    function Coordinate(stringCoordinate) {
        this.x = 0;
        this.y = 0;
        this.isInfinite = false;
        this.positionsList = [];
        var splitArray = stringCoordinate.split(", ");
        this.x = parseInt(splitArray[0]);
        this.y = parseInt(splitArray[1]);
    }
    return Coordinate;
}());
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.x = 0;
        this.y = 0;
        this.closestCoordinate = new Coordinate("0, 0");
        this.x = x;
        this.y = y;
    }
    Position.prototype.setClosestCoordinate = function (coordinate) {
        this.closestCoordinate = coordinate;
    };
    return Position;
}());
function advent(error, input) {
    var inputArray = input.split("\n");
    var coordinates = [];
    inputArray.forEach(function (stringCoord) {
        coordinates.push(new Coordinate(stringCoord));
    });
    // Determine relevant playing field:
    var minX = coordinates[0].x, maxX = coordinates[0].y;
    var minY = coordinates[0].y, maxY = coordinates[0].y;
    for (var i = 1; i < coordinates.length; i++) {
        if (coordinates[i].x < minX) {
            minX = coordinates[i].x;
        }
        if (coordinates[i].x > maxX) {
            maxX = coordinates[i].x;
        }
        if (coordinates[i].y < minY) {
            minY = coordinates[i].y;
        }
        if (coordinates[i].y > maxY) {
            maxY = coordinates[i].y;
        }
    }
    var positionArray = [];
    for (var i = minX; i < maxX + 1; i++) {
        for (var j = minY; j < maxY + 1; j++) {
            var isCoordinate = false;
            for (var k = 0; k < coordinates.length; k++) {
                if (i === coordinates[k].x && j === coordinates[k].y) {
                    isCoordinate = true;
                    break;
                }
            }
            if (!isCoordinate) {
                positionArray.push(new Position(i, j));
            }
        }
    }
    for (var i = 0; i < positionArray.length; i++) {
        var closestCoordinate = coordinates[0];
        var closestCoordinateDist = determineDistance(closestCoordinate.x, closestCoordinate.y, positionArray[i].x, positionArray[i].y);
        var hasMulipleClosestCoords = false;
        for (var j = 0; j < coordinates.length; j++) {
            var newCoordinateDist = determineDistance(coordinates[j].x, coordinates[j].y, positionArray[i].x, positionArray[i].y);
            if (newCoordinateDist < closestCoordinateDist) {
                closestCoordinate = coordinates[j];
                closestCoordinateDist = newCoordinateDist;
            }
            else if (closestCoordinateDist === newCoordinateDist) {
                hasMulipleClosestCoords = true;
                console.log(closestCoordinateDist);
                console.log(closestCoordinateDist + "   " + newCoordinateDist + " i dunn did it");
            }
        }
        if (hasMulipleClosestCoords === false) {
            positionArray[i].setClosestCoordinate(closestCoordinate);
            console.log("i've arrived!");
        }
    }
    for (var i = 0; i < positionArray.length; i++) {
    }
}
function determineDistance(x1, y1, x2, y2) {
    if (x1 < 0) {
        x1 *= -1;
    }
    ;
    if (y1 < 0) {
        y1 *= -1;
    }
    ;
    if (x2 < 0) {
        x2 *= -1;
    }
    ;
    if (y2 < 0) {
        y2 *= -1;
    }
    ;
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}
// Dus, ik heb een array bestaande uit allemaal coordinaten, behalve de daadwerkelijke GEGEVEN coordinaten. 
// Voor elk zo'n nep-coordinaat wil ik kijken:
//  Welk vak zit bij mij het meest in de buurt?
