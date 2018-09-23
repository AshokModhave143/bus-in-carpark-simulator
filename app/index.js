'use strict';
/**
 * Bus in car park simulator app. This requires the bus instance 
 * and its methods to operate
 */
/**
 * Import required dependencies and initialize variables
 */
const os = require("os"),
    stdin = process.stdin,
    stdout = process.stdout,
    readline = require("readline"),
    EOL = os.EOL,
    config = require("./config"),
    commandProcessor = require("./commandProcessor"),
    bus = require("./busFactory"),
    messenger = bus.getMessenger();

let argv = null;

stdin.setEncoding("utf-8");
process.title = "Bus in car park simulator";

argv = process.argv.slice(2);

//Run when user start input from command promt
stdin.on("data", (data)=> {
    console.log("Data = " + data);
    processInput(data);
});

//Check the arguments if any
if(argv.length) {
    console.log(argv);
}

// Process the input from user from CLI
const processInput = (data)=> {
    console.log(data);
    let result, _data = data.trim();

    if(_data.match(/(q|quit|exit)/i)) {
        process.exit();
    }

    result = commandProcessor.processRequest( _data, bus, messenger);
    //console.log(bus);
    if(result instanceof Error) {
        stdout.write(result.message + os.EOL + '> ');
    } else if(typeof result == 'string') {
        stdout.write(result + os.EOL + '> ');
    } else {
        stdout.write('> ');
    }
};

const app = ()=> {};
app.run = ()=> {
    stdout.write("Welcome to Simulator \n");
    stdin.resume();
}

module.exports = app;
