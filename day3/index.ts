// Advent of code day 3
import { readFile } from "fs";
readFile("input.txt", "utf8", advent);

interface Coordinate {
    x: number;
    y: number; 
}

// id and coveredCoordinates are used for part 2 of the challenge
interface RectangleForm {
    id: string;
    paddingLeft: number;
    paddingTop: number;
    width: number;
    height: number;
    coveredCoordinates: Coordinate[];
}

class Rectangle implements RectangleForm {
    id: string; 
    paddingLeft: number;
    paddingTop: number;
    width: number;
    height: number;
    coveredCoordinates: Coordinate[];

    // The constructor parses the string-representation of one rectangle
    constructor(rectangleString: string){
        let rectStringArray: string[];
    
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
}

function advent(error: Error, input: string) {
    let stringArray = input.split("\n"); 
    let rectangleArray: Rectangle[] = [];

    // Create a Rectangle object for each rectangle-string-representation and put it in the rectangleArray
    for(let i = 0; i < stringArray.length; i++){
        let newRectangle: Rectangle = new Rectangle(stringArray[i]);
        rectangleArray.push(newRectangle); 
    }
    
    //Create a 1000 x 1000 representation of the fabric for Santa's uniform
    let fabricArray : number[][] = [];

    for(let i = 0; i < 1000; i++){
        fabricArray[i] = [];
        for(let j = 0; j < 1000; j++){
            fabricArray[i].push(0);
        }
    }
    
    // For each rectangle, build a list of all coordinates used in that rectangle.
    for(let i = 0; i < rectangleArray.length; i++){

        let paddingLeft: number = rectangleArray[i].paddingLeft -1;
        let paddingTop: number = rectangleArray[i].paddingTop -1;
        let coveredCoordinates: Coordinate[] = []; 

        for( let j = paddingLeft; j < rectangleArray[i].width + paddingLeft; j++){
            for( let k = paddingTop; k < rectangleArray[i].height + paddingTop; k++){
                let newCoordinate: Coordinate = {
                    x: j + 1,
                    y: k + 1
                }
                coveredCoordinates.push(newCoordinate);
                rectangleArray[i].coveredCoordinates.push(newCoordinate); 
            }
        }

        // For each coordinate used in the current rectangle, update the fabricArray
        for( let j = 0; j < coveredCoordinates.length; j++){
            let x = coveredCoordinates[j].x;
            let y = coveredCoordinates[j].y;
            fabricArray[x][y]++;
        }
    }

    // This bit of code determines the answer to part 1 of the day 3 challenge
    let endResult: number = 0; 
    for( let i = 0; i < fabricArray.length; i++){
        for (let j = 0; j < fabricArray.length; j++){
            if(fabricArray[i][j] > 1){
                endResult++;
            }
        }
    }
    console.log(endResult); 

    // To answer part 2 of the day 3 advent of code challenge, 
    // We'll loop through all square inches of the fabricArray again and check the coordinates in each rectangle.
    // If all the needed inches for a rectangle have a value of 1 in the fabricArray, 
    // that means that ONLY that rectangle covers that part of the fabric.

    for(let i = 0; i < rectangleArray.length; i++){
        let rectangleIsIsolated: boolean = true; 
        for(let j = 0; j < rectangleArray[i].coveredCoordinates.length; j++){
            let x: number = rectangleArray[i].coveredCoordinates[j].x;
            let y: number = rectangleArray[i].coveredCoordinates[j].y;
            
            if(fabricArray[x][y] !== 1){
                rectangleIsIsolated = false;
            }
        }

        if(rectangleIsIsolated){
            console.log(rectangleArray[i].id);
        }
    }
}