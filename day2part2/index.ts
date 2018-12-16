import { readFile } from "fs";

readFile("input.txt", "utf8", advent);

function advent(error: Error, input: string) {
    console.log(input);
}