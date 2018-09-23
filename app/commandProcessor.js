'use strict';

/**
 * This function performs the task of processing user input 
 * either from CLI or file
 * 
 * @param {String} cmd command from user, like "PLACE, MOVE, LEFT, RIGHT, REPORT"
 * @returns {Error|String|Object}  
 */
exports.processRequest = (bus, cmd) => {
    let res;
    if(cmd.match(/^\s*place\s+\w+(?:,?\s*|\s+)\w+(?:,?\s*|\s+)\w+\s*$/i)) {
        let params = cmd.trim().split(/(?:,?\s+|,\s*)/i).slice(1);
        console.log(params);
        //place the bus to above params
        res = "place"
    } else if(cmd.match(/^move\s*$/i)) {
        //move bus
        res = "move";
    } else if(cmd.match(/^left\s*$/i)) {
        //left
        res = "left";
    } else if(cmd.match(/^right\s*$/i)) {
        //right
        res = "right";
    } else if(cmd.match('/^report\s*$/i')) {
        //report
        res = "report";
    } else {
        res = "Unknown command";
    }
    return res;
};
