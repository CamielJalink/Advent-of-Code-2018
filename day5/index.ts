// Advent of code day 5
import { readFile } from "fs";
readFile("input.txt", "utf8", advent);
 
// Main function called when the program is started
function advent(error: Error, inputString: string){
    
    console.log("Answer part one: " + resolveString(inputString));

    // Check which characters are present in the inputString.
    // This code could be replaced by a hardcoded array of all the (lowercase) alphabet letters.
    let polymerCharArray: string[] = []
    for(let i = 0; i < inputString.length; i++){
        if(polymerCharArray.indexOf(inputString[i].toLowerCase()) === -1){
            polymerCharArray.push(inputString[i].toLowerCase());
        }
    }
    
    // For each unique lowercase character, build a string with that polymer
    let shortestResult: number = 0;
    polymerCharArray.forEach(char => {
        let alteredInput: string = inputString;
        for(let i = 0; i < alteredInput.length; i++){
            if(alteredInput[i].toLowerCase() === char){
                let remainsLeft: string = alteredInput.slice(0, i);
                let remainsRight: string = alteredInput.slice(i+1);
                alteredInput = remainsLeft + remainsRight; 
                i--;
            }
        }

        if(shortestResult === 0 || shortestResult > resolveString(alteredInput)){
            shortestResult = resolveString(alteredInput);
        }
    })

    console.log("Answer part two: " + shortestResult);
}


function resolveString(input: string) {
    for(let i = 1; i < input.length; i++){
        
        if(input[i] !== input[i-1] && (input[i] === input[i-1].toUpperCase() || input[i].toUpperCase() === input[i-1])){
            let remainsLeft: string = input.slice(0, i-1);
            let remainsRight: string = input.slice(i+1);
            input = remainsLeft + remainsRight;
            // Set index i back to check for newly formed removeable pairs.
            if(i > 1){
                i = i - 2;
            } else{
                i = i - 1;
            }
        }
    }
    return input.length;
}