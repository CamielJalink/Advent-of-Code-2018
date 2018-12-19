// Advent of code day 4
import { readFile } from "fs";
readFile("input.txt", "utf8", advent);

class Event {

    eventString: string;
    year: number;
    month: number;
    day: number;

    constructor(rawEventString: string){
        let rawString: string, rawDate: string, rawTime: string;
        let stringYear: string, stringMonth: string, stringDay: string;

        [rawString, this.eventString] = rawEventString.split("] ");
        // remove the "["
        rawString = rawString.substring(1);
        [rawDate, rawTime] = rawString.split(" ");
        
        [stringYear, stringMonth, stringDay] = rawDate.split("-");
        this.year = parseInt(stringYear);
        this.month = parseInt(stringMonth); 
        this.day = parseInt(stringDay);
        // PROBLEEM: parseint laat voorloopnullen weglopen, dus ik wil deze integers als string. 
        console.log(this.year);
        console.log(this.month);
        console.log(this.day);
    }
}

function advent(error: Error, input: string){
    let inputArray: string[] = input.split("\n");
    let eventArray: Event[] = [];

    for(let i = 0; i < inputArray.length; i++){
        let event: Event = new Event(inputArray[i]);
        eventArray.push(event);
    }

   // console.log(eventArray); 
}





// Program plans:
// Sort all 'events' based on their year, month, day, hour and minutes

// 1518-05-27 23:59   is later dan 1518-05-27 00:01
// Dus misschien alles samen als number parsen door alle tekens eraf te halen? 
// Een shift class die events bekijkt die bij elkaar horen? OF is dat niet relevant?
// Ik wil alle minuten tellen. Shift is obvious als alles netjes op een rijtje staat adhv wie active is.