// Advent of code day 6
import { readFile } from "fs";
import { stringify } from "querystring";
readFile("input.txt", "utf8", advent);

// deze class is nodig want: ik wil weten hoeveel punten hij 'bij zijn vlak' heeft. 
class Coordinate {
    x: number = 0;
    y: number = 0;
    isInfinite: boolean = false; 
    positionsList: Position[] = []; 

    constructor(stringCoordinate:string){
        let splitArray: string[] = stringCoordinate.split(", ");
        this.x = parseInt(splitArray[0]);
        this.y = parseInt(splitArray[1]);
    }
}


class Position {
    x: number = 0;
    y: number = 0;
    closestCoordinate: Coordinate = new Coordinate("0, 0");

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    setClosestCoordinate(coordinate: Coordinate){
        this.closestCoordinate = coordinate; 
    }
}


function advent(error: Error, input: string){
    
    let inputArray: string[] = input.split("\n");
    let coordinates: Coordinate[] = [];
    inputArray.forEach(stringCoord => {
        coordinates.push(new Coordinate(stringCoord));
    })

    // Determine relevant playing field:
    let minX: number = coordinates[0].x, maxX: number = coordinates[0].y;
    let minY: number = coordinates[0].y, maxY: number = coordinates[0].y;
    for(let i = 1; i < coordinates.length; i++){
        if(coordinates[i].x < minX){
            minX = coordinates[i].x;
        }
        if(coordinates[i].x > maxX){
            maxX = coordinates[i].x;
        }
        if(coordinates[i].y < minY){
            minY = coordinates[i].y;
        }
        if(coordinates[i].y > maxY){
            maxY = coordinates[i].y;
        }
    }

    let positionArray: Position[] = [];
    for(let i = minX; i < maxX + 1; i++){
        for(let j = minY; j < maxY + 1; j++){
            let isCoordinate: boolean = false;
            for(let k = 0; k < coordinates.length; k++){
                if(i === coordinates[k].x && j === coordinates[k].y){
                    isCoordinate = true;
                    break; 
                }
            }

            if(!isCoordinate){
                positionArray.push(new Position(i,j));
            }
        }
    }

    

    for(let i = 0; i < positionArray.length; i++){
        let closestCoordinate: Coordinate = coordinates[0];
        let closestCoordinateDist: number = determineDistance(closestCoordinate.x, closestCoordinate.y, positionArray[i].x, positionArray[i].y);
        let hasMulipleClosestCoords: boolean = false;

        for(let j = 0; j < coordinates.length; j++){
            let newCoordinateDist = determineDistance(coordinates[j].x, coordinates[j].y, positionArray[i].x, positionArray[i].y);
            if(newCoordinateDist < closestCoordinateDist){
                closestCoordinate = coordinates[j]; 
                closestCoordinateDist = newCoordinateDist;
            } else if(closestCoordinateDist === newCoordinateDist){
                hasMulipleClosestCoords = true;
                console.log(closestCoordinateDist);
                console.log(closestCoordinateDist + "   " + newCoordinateDist + " i dunn did it"); 
            }
            
        }

        if(hasMulipleClosestCoords === false){
            positionArray[i].setClosestCoordinate(closestCoordinate);
            console.log("i've arrived!"); 
        }
    }

    for(let i = 0; i < positionArray.length; i++){
        
    }
}


function determineDistance(x1:number, y1:number, x2:number, y2:number){
    if( x1 < 0){ x1 *= -1 };
    if( y1 < 0){ y1 *= -1 };
    if( x2 < 0){ x2 *= -1 };
    if( y2 < 0){ y2 *= -1 };
    return Math.abs(x2-x1) + Math.abs(y2-y1);
}

// Dus, ik heb een array bestaande uit allemaal coordinaten, behalve de daadwerkelijke GEGEVEN coordinaten. 
// Voor elk zo'n nep-coordinaat wil ik kijken:
//  Welk vak zit bij mij het meest in de buurt?