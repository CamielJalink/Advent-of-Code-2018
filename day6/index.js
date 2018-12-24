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
    console.log(positionArray);
    for (var i = 0; i < positionArray.length; i++) {
        var closestCoordinate = coordinates[0];
        for (var j = 0; j < coordinates.length; j++) {
            // this still needs work.
        }
        positionArray[i].setClosestCoordinate(closestCoordinate);
    }
}
function determineDistance(x1, y1, x2, y2) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}
// Idee: Een class coordinates, die een x en een y coordinaat heeft.
// --> Een class grid met een x en een y die zelf berekent bij welk coordinaat hij hoort,
//     en dat de coordinaat een array met bij zich horende vakjes heeft. 
// --> Coordinaten houden bij of ze infinite zijn of niet. 
// 1. Lees alle coordinaten in. We kunnen de min en max X en Y bedenken, en dan hebben we een soort van beeld
//    bij de grootte van het grid.
// 2. STEL DAT: we gewoon alleen denken in termen van dat grid. 
