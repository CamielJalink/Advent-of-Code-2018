"use strict";
exports.__esModule = true;
// Advent of code day 6
var fs_1 = require("fs");
fs_1.readFile("input.txt", "utf8", advent);
// Main function called when the program is started
function advent(error, input) {
    console.log(input);
    var inputArray = [];
}
// Idee: Een class coordinates, die een x en een y coordinaat heeft.
// --> Een class grid met een x en een y die zelf berekent bij welk coordinaat hij hoort,
//     en dat de coordinaat een array met bij zich horende vakjes heeft. 
// --> Coordinaten houden bij of ze infinite zijn of niet. 
// 1. Lees alle coordinaten in. We kunnen de min en max X en Y bedenken, en dan hebben we een soort van beeld
//    bij de grootte van het grid.
// 2. STEL DAT: we gewoon alleen denken in termen van dat grid. 
