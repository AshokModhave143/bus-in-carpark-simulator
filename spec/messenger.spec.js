'use strict';

/**
 * Testing Messenger
 */
const config = require("../app/config");
const Messenger = require("../app/messenger");

describe('Messenger', () => {
    let messenger, x, y, f, s;
    
    beforeAll(() => {
        messenger = new Messenger(config.messenger);
        x = 1;
        y = 2;
        f = 'SOUTH',
        s = 'sake'
    });

    /**
     * Test all messages in loop
     */
    for (let key in config.messenger.outMessages) {
        testEachMessage(key);
    }
    function testEachMessage(key) {
        it(['should output correct', key, 'message'].join(" "), ()=> {
            expect(messenger.getMessage({
                msg: key,
                x: x,
                y: y,
                f: f
            })).toEqual(messenger._constructMessage({
                msg: key,
                x: x,
                y: y,
                f: f
            }));
        });
    };
});
