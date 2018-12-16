// Unlike the previous three exercises, this one is built using typescript.
// Start with node index.js  (instead of npm start in the previous examples)

import { readFile } from "fs";

readFile("input.txt", "utf8", advent);

function advent(error: Error, input: string) {
    let inputArray = input.split("\n");
    // vars in for loops nog naar const omschrijven
    for( var i = 0; i < inputArray.length - 1; i++){
        for( var j = i + 1; j < inputArray.length; j++){
           
            var diffNumber: number = 0;
            for( var k = 0; k < inputArray[i].length; k++){

                if( inputArray[i][k] !== inputArray[j][k]){
                    diffNumber++;
                }

                if( diffNumber > 1){
                    break;
                }
            }

            if ( diffNumber === 1){
                // We found em, now find the corresponding characters in both strings.
                let resultString: string = "";
                for(let l = 0; l < inputArray[i].length; l++){
                    if(inputArray[i][l] === inputArray[j][l]){
                        resultString += inputArray[i][l];
                    }
                }
                return(console.log("Houston, we got 'em"  + " " + resultString));
            }
        }
    }
}