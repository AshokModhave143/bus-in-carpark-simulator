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
    length: 5
},
config.bus = {
    commands: ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'],
    initialCommand: ['PLACE'],
    directions: ['NORTH', 'EAST', 'SOUTH', 'WEST']
},

module.exports = config;