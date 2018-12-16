//https://www.npmjs.com/package/read-input

// This is the solution for part 1 of day 2.
var read = require('read-input');
var fnames = process.argv.slice(2);

read(fnames).then(function (res) {

    var inputArray = res.data.split("\n");
    var doublesOcurrences = 0;
    var triplesOccurences = 0;

    for(var i = 0; i < inputArray.length ; i++){
        var currentString = inputArray[i];
        var currentStringHasDouble = false;
        var currentStringHasTriple = false; 

        for(var j = 0; j < currentString.length; j++){
            var currentCharCount = 0;
            for(var k = 0; k < currentString.length; k++){
                
                if(currentString[j] === currentString[k]){
                    currentCharCount ++;
                }
            }

            if(currentCharCount > 2){
                currentStringHasTriple = true; 
            } else if (currentCharCount > 1){
                currentStringHasDouble = true;
            }
        }
  
        if(currentStringHasTriple){
            triplesOccurences++;
        } 
        if(currentStringHasDouble){
            doublesOcurrences++;
        }
    }
    console.log("Number of doubles " + doublesOcurrences);
    console.log("Number of triples " + triplesOccurences);
    console.log("doubles x triples " + (doublesOcurrences * triplesOccurences))
})