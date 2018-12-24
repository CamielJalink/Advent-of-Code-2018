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

    console.log(positionArray);

    for(let i = 0; i < positionArray.length; i++){
        let closestCoordinate: Coordinate = coordinates[0];
        for(let j = 0; j < coordinates.length; j++){
            // this still needs work.
        }
        positionArray[i].setClosestCoordinate(closestCoordinate);
    }
}


function determineDistance(x1:number, y1:number, x2:number, y2:number){
    return Math.abs(x2-x1) + Math.abs(y2-y1);
}

// Idee: Een class coordinates, die een x en een y coordinaat heeft.
// --> Een class grid met een x en een y die zelf berekent bij welk coordinaat hij hoort,
//     en dat de coordinaat een array met bij zich horende vakjes heeft. 
// --> Coordinaten houden bij of ze infinite zijn of niet. 

// 1. Lees alle coordinaten in. We kunnen de min en max X en Y bedenken, en dan hebben we een soort van beeld
//    bij de grootte van het grid.
// 2. STEL DAT: we gewoon alleen denken in termen van dat grid. 