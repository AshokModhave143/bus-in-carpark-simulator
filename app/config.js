'use strict';
/**
 * This module defines the constants for Bus in car park simulator
 */

/**
 * Import dependencies and initialize variables
 */
const path = require("path");

let config = {};
config.app = {
    root: path.resolve(__dirname)
},
config.carPark = {
    startPointX: 0,
    startPointY: 0,
    lengthX: 5,
    lengthY: 5
},
config.bus = {
    commands: ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'],
    initialCommand: ['PLACE'],
    directions: ['NORTH', 'EAST', 'SOUTH', 'WEST']
},
config.messenger = {
    outMessages: {
        noInitialCommand: "Warning! Bus is not placed in car park yet. Type command 'PLACE X, Y, F' to place Bus in car park.",
        placeBusFirst: "Nothing to report. No bus found in car park. To begin, place the bus in car park - PLACE X, Y, F",
        wrongPlace: "Error! Invalid coordinates specified",
        noFace: "Error! No FACE was provided",
        faceNotString: "Error! FACE is not a string",
        nonIntCoordinates: "Error! Coordinates must be positive integer",
        noNegativeCoordinates: "Error! Coordinates must be positive integers",
        wrongDirection: "Error! Invalid direction. Avaiable directions are: {availableDirections}",
        wrongMove: "Warning! You can not move bus that way, it will fall",
        busPosition: "bus postion is: {x}, {y}, {f}",
        unknownCommand: "Error! Command is incorrect or unknown. Available commands: {availableCommands}",
        welcome: 'Hi There, Begin by placing by placing the bus in car park - PLACE X,Y,F e.g. 0,0,north. or \'q\' to quit'
    },
    outSubMsg: {
        availableDirections: config.bus.directions.join(","),
        availableCommands: [config.bus.commands.reduce((prev, curr)=>{
            if(prev == "PLACE") prev = [prev, 'X, Y, F'].join(" ");
            return prev + " | " + curr;
        }), "."].join("")
    }
};

module.exports = config;