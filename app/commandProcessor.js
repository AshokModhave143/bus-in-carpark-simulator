'use strict';

/**
 * This function performs the task of processing user input 
 * either from CLI or file
 * 
 * @param {String} cmd command from user, like "PLACE, MOVE, LEFT, RIGHT, REPORT"
 * @returns {Error|String|Object}  
 */
exports.processRequest = (cmd, bus, messenger) => {
    let res;
    if(cmd.match(/^\s*place\s+\w+(?:,?\s*|\s+)\w+(?:,?\s*|\s+)\w+\s*$/i)) {
        // place
        let params = cmd.trim().split(/(?:,?\s+|,\s*)/i).slice(1);
        //console.log(params);
        res = bus.place(params[0], params[1], params[2]);
    } else if(cmd.match(/^move\s*$/i)) {
        //move bus
        res = bus.move();
    } else if(cmd.match(/^left\s*$/i)) {
        //left
        res = bus.left();
    } else if(cmd.match(/^right\s*$/i)) {
        //right
        res = bus.right();
    } else if(cmd.match(/^report\s*$/i)) {
        //report
        res = bus.report();
    } else {
        res = new Error(messenger.getMessage({
            msg: 'unknownCommand'
        }));
    }
    return res;
};
