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
    totalMinutesAsleep: number = 0;
    sleepArray: number[] = [];

    constructor(id: string){
        this.id = id;
        for(let i = 0; i < 60; i++){
            this.sleepArray.push(0);
        }
    }

    updateSleep(startMinute:number, duration:number){
        this.totalMinutesAsleep += duration;
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
    // Loop through all events and determine active guard and their sleep pattern
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
            // If it's a new guard, create a new guard object.
            if(isNewGuard){
                let guard: Guard = new Guard(guardId);
                guardArray.push(guard);
                activeGuard = guard;
            }
        }

        // If a guard wakes up, check the previous event for sleep and determine sleep start and duration.
        if(eventArray[i].eventString.indexOf("wakes up") !== -1){
            if(eventArray[i-1].eventString.indexOf("falls asleep") !== -1){
                let sleepStart: number = eventArray[i-1].dateOfEvent.getUTCMinutes();
                let sleepDuration: number = eventArray[i].dateOfEvent.getUTCMinutes() - sleepStart;
                activeGuard.updateSleep(sleepStart,  sleepDuration);
            }
        }
    }


// This part of the code is only relevant for part A of the challenge
    let mostSleepyGuard: Guard = guardArray[0];

    for(let i = 1; i < guardArray.length; i++){
        if(guardArray[i].totalMinutesAsleep > mostSleepyGuard.totalMinutesAsleep){
            mostSleepyGuard = guardArray[i];
        }
    }

    let minuteMostAsleep: number = 0;
    let timesAsleep: number = 0;
    for(let i = 0; i < mostSleepyGuard.sleepArray.length; i++){
        if(mostSleepyGuard.sleepArray[i] > timesAsleep){
            minuteMostAsleep = i;
            timesAsleep = mostSleepyGuard.sleepArray[i];
        }
    }

    console.log("Answer part A = " + minuteMostAsleep * parseInt(mostSleepyGuard.id));
//-----------------------------------------------------------------------
// This part of the code is only relevant for part B of the challenge
    minuteMostAsleep = 0;
    timesAsleep = 0;
    let targetGuard: Guard = guardArray[0];
    for(let i = 0; i < guardArray.length; i++){
        for(let j = 0; j < guardArray[i].sleepArray.length; j++){
            if(guardArray[i].sleepArray[j] > timesAsleep){
                minuteMostAsleep = j;
                timesAsleep = guardArray[i].sleepArray[j];
                targetGuard = guardArray[i];
            }
        }
    }
    console.log("Answer part B = " + minuteMostAsleep * parseInt(targetGuard.id));
}