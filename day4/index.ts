// Advent of code day 4
import { readFile } from "fs";
readFile("input.txt", "utf8", advent);

class Event {
    eventString: string;
    dateOfEvent: Date = new Date();

    constructor(rawEventString: string){
        let rawDateTime: string;
        [rawDateTime, this.eventString] = rawEventString.split("] ");
        // Remove the [ in front of the rawDateTime string, and add "Z" for UTC time format.
        rawDateTime = rawDateTime.substring(1) + "Z";
        this.dateOfEvent = new Date(rawDateTime);
    }
}

class Guard {
    id: string;
    events: Event[] = []; 
    totalMinutesAsleep: number = 0;
    sleepArray: number[] = [];

    constructor(id: string){
        this.id = id;
        for(let i = 0; i < 60; i++){
            this.sleepArray.push(0);
        }
    }

    addEvent(event: Event){
        this.events.push(event);
    }

    updateSleep(startMinute:number, duration:number){
        this.totalMinutesAsleep += duration;
        // 
        for(let i = startMinute; i < startMinute + duration; i++){
            this.sleepArray[i] ++;
        }
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

    // Sort all events so that the event with the oldest date is listed first.
    eventArray.sort(function(a, b) {
        if (a.dateOfEvent < b.dateOfEvent) {
            return -1;
        }
        if (a.dateOfEvent > b.dateOfEvent) {
            return 1;
        }
        return 0;
    })


    let guardArray: Guard[] = [];
    let activeGuard: Guard = new Guard(" ");
    for(let i = 0; i < eventArray.length; i++){

        if(eventArray[i].eventString.indexOf("Guard #") !== -1){

            let guardId: string = eventArray[i].eventString.split(" begins shift")[0].substring(7);
            let isNewGuard: boolean = true; 

            // Is this a new guard?
            for(let j = 0; j < guardArray.length; j++){
                if(guardArray[j].id == guardId){
                    isNewGuard = false; 
                    activeGuard = guardArray[j];
                }
            }

            // If it's a new guard, create it.
            if(isNewGuard){
                let guard: Guard = new Guard(guardId);
                guardArray.push(guard);
                activeGuard = guard;
            }
        }
        activeGuard.addEvent(eventArray[i]);
    }

    guardArray.forEach(function(guard: Guard){
        console.log(guard.events.length);
    })

    // Nu ik alle guards heb met al hun events, kan ik per guard bekijken welke minuten die slaapt,
    // 
    // En welke minuut hij het meeste in slaapt.

}