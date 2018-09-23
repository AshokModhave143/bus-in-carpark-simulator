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
    stderr = process.stderr,
    readline = require("readline"),
    EOL = os.EOL,
    config = require("./config"),
    commandProcessor = require("./commandProcessor"),
    bus = require("./busFactory"),
    messenger = bus.getMessenger(),
    path = require("path"),
    fs = require("fs");

let argv, rl;

stdin.setEncoding("utf-8");
process.title = "Bus in car park simulator";

argv = process.argv.slice(2);

//Run when user start input from command promt
stdin.on("data", (data)=> {
    processInput(data);
});

/**
 * Check if there are any arguments for file input
 */
if(argv.length) {
    console.log(argv);
    //Read file input
    try {
        fs.accessSync(argv[0], fs.F_OK | fs.R_OK);
    } catch(e) {
        stderr.write(messenger.getMessage({
            msg: "fileNotFound",
            fileName: argv[0]
        }));
        process.exit();
    }

    // Read file message
    stderr.write(messenger.getMessage({
        msg: "fileRead",
        fileName: argv[0],
        eol: EOL
    }));

    rl = readline.createInterface({
        input: fs.createReadStream(argv[0]),
        terminal: false
    });

    //Event handler. Called when line is read from file
    rl.on("line", (line) => {
        stdout.write(line + EOL);
        processInput(line);
    });

    //Event handler. Called when all lines read complete. Closes the stream
    rl.on("close", ()=> {
        rl.close();
        process.exit();
    });
}

// Process the input from user from CLI
const processInput = (data) => {
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

/**
 * App initialization
 * @static
 */
const app = () => {};
app.run = ()=> {
    stdout.write(messenger.getMessage({
        msg: "welcome",
        eol: EOL
    }) + EOL + '> ');
    stdin.resume();
}

//Module Export
module.exports = app;
