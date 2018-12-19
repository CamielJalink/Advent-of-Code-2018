// Advent of code day 4
import { readFile } from "fs";
readFile("input.txt", "utf8", advent);

class Event {
    eventString: string;
    dateOfEvent: Date;

    constructor(rawEventString: string){
        let rawDateTime: string;
        [rawDateTime, this.eventString] = rawEventString.split("] ");
        rawDateTime = rawDateTime.substring(1);
        this.dateOfEvent = new Date(rawDateTime);
    }
}

// Main function called when the program is started
function advent(error: Error, input: string){
    let inputArray: string[] = input.split("\n");
    let eventArray: Event[] = [];

    for(let i = 0; i < inputArray.length; i++){
        let event: Event = new Event(inputArray[i]);
        eventArray.push(event);
    }

    // Hieronder ben ik gebleven
    let orderedEventArray: Event[] = []; 
    eventArray.forEach(event => {
        for(let i = 0; i < eventArray.length; i++){
            if(event.dateOfEvent > eventArray[i].dateOfEvent){

            }
        }
    });
   console.log(eventArray); 
}

// Program plans:
// Sort all 'events' based on their year, month, day, hour and minutes

// 1518-05-27 23:59   is later dan 1518-05-27 00:01
// Dus misschien alles samen als number parsen door alle tekens eraf te halen? 
// Een shift class die events bekijkt die bij elkaar horen? OF is dat niet relevant?
// Ik wil alle minuten tellen. Shift is obvious als alles netjes op een rijtje staat adhv wie active is.