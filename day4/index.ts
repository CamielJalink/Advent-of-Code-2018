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
        rawDateTime = rawDateTime + ":00";
        console.log(rawDateTime);
        this.dateOfEvent = new Date(rawDateTime);
        console.log(this.dateOfEvent);
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

    eventArray.sort(function(a, b) {
        if (a.dateOfEvent < b.dateOfEvent) {
            return -1;
        }
        if (a.dateOfEvent > b.dateOfEvent) {
            return 1;
        }
        return 0;
    })

   // console.log(eventArray);
}