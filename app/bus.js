'use strict';
/**
 * Bus Class. This module does all operations related to Bus
 * The Bus class dependencies are CarPark and Messenger instance
 * 
 * @param {object} config configuration of Bus
 * @param {object} carPark Car park instance
 * @param {object} messenger messenger instance
 */
const Bus = function (config, carPark, messenger) {
    this._config = config;
    this._carPark = carPark;
    this._messenger = messenger;
    this._isFirstStepMade = false;

    this._currentPosition = {
        x: undefined,
        y: undefined,
        f: undefined
    };

    /**
     * Place the bus in car park. 
     * @param {INT} x x-coordinate
     * @param {INT} y y-coordinate
     * @param {String} f FACE direction (NORTH, SOUTH, EAST, WEST).
     * @returns {Error|Bus} If placed correctly, returns Bus 'this' instance else returns error
     * @public
     */
    this.place = (x, y, f)=> {
        let arg = {};

        // validate user input
        try {
            arg = this._validateInput(x, y, f);
        } catch(e) {
            return e;
        }

        // place bus only inside car park
        if(this._isOutOfCarPark(arg.x, arg.y)) {
            return new Error(this._messenger.getMessage({
                msg: 'wrongPlace'
            }));
        }

        // Place bus - update position - X,Y,F
        this._setBusPosition(arg.x, arg.y, arg.f);

        // Set initial PLACE has been made flag
        if(!this._isFirstStepMade) {
            this._isFirstStepMade = true;
        }

        //return
        return this;
    };
    
    /**
     * Move the bus - It is not possible to move Bus if no initial PLACE was made - return error.
     * @returns {Error|Bus} if move successfully, return Bus instance else return error
     * @public
     */
    this.move = ()=> {
        // check if bus is placed in park before this command
        if(!this._isFirstStepMade) {
            return new Error(this._messenger.getMessage({
                msg: "noInitialCommand"
            }));
        }

        //Change x,y coordinates
        let {x,y,f} = this._currentPosition;
        switch(f) {
            case 0: // north
                ++y;
                break;
            case 1: // east
                ++x;
                break;
            case 2: // south
                --y;
                break;
            case 3: // west
                --x;
                break;
        }

        //check if bus coordinate is not outside of park
        if(this._isOutOfCarPark(x,y)) {
            return new Error(this._messenger.getMessage({
                msg: "wrongMove"
            }));
        }
        //update the bus position to current
        this._setBusPosition(x, y, this._config.directions[f]);

        //return updates bus object
        return this;
    };

    /**
     * Turn bus face to right. Return error if no inital place for bus is made 
     * else return current Bus instance
     * @returns {Error|Bus} 
     * @public
     */
    this.right = ()=> {
        //check if initial PLACE command is made
        if(!this._isFirstStepMade) {
            return new Error(this._messenger.getMessage({
                msg: "noInitialCommand"
            }))
        }

        //Set face to right
        this._currentPosition.f = (this._currentPosition.f + 1) > 3 ? 0 : this._currentPosition.f + 1;
        
        //return current Bus object
        return this;
    };

    /**
     * Turn bus face left. Returns error if no inital Place made 
     * else returns current Bus instance
     * @returns {Error|Bus} 
     * @public
     */
    this.left = ()=> {
        //check if initial place has done
        if(!this._isFirstStepMade) {
            return new Error(this._messenger.getMessage({
                msg: "noInitialCommand"
            }));
        }

        // Set Bus face to left
        this._currentPosition.f = (this._currentPosition.f - 1) < 0 ? 3 : this._currentPosition.f - 1;

        //return current Bus instance
        return this;
    };
    //report
    this.report = (msgObj) => {
        if(!msgObj) {
            let oPos = this._getBusPosition();

            // No PLACE yet, coords are undefined, return message "PLACE a bus to begin", no coords
            if(oPos.x == undefined && oPos.y == undefined && oPos.f == undefined) {
                return this._messenger.getMessage({
                    msg: 'placeBusFirst'
                });
            } else {
                return this._messenger.getMessage({
                    msg: 'busPosition',
                    x: oPos.x,
                    y: oPos.y,
                    f: oPos.f
                });
            }
        } else {
            return this._messenger.getMessage(msgObj);
        }
    };

    /**
     * Send the current locatoion of the bus
     * @return {Object}  {x: correct-int-x, y: correct-int-y, f:
     * correct-FACE-word}. F is returned only UPPERCASED!
    */
    this.currentPosition = function () {
        var oPosition = this._getBusPosition();
        return  {
            x: oPosition.x,
            y: oPosition.y,
            f: oPosition.f
        };
    };

    //Validate input
    this._validateInput = (x, y, f) => {

        // Validate face value
        this._checkFace(f);

        const _f = f.toUpperCase(), 
            _x = parseInt(x),
            _y = parseInt(y); 

        // Validate Coordinates
        this._checkCoordinates(_x, _y);

        this._checkIfDirectionValid(_f);

        return { x: _x, y: _y, f: _f };
    };
    /**
     * Validate the face direction of the user input
     * @param {string} f - FACE direction of bus e.g. north, south, east, west
     */
    this._checkFace = (f) => {
        // FACE cannot be undefined
        if(!f) {
            throw new TypeError(this._messenger.getMessage({
                msg: 'noFace'
            }));
        }
        // FACE must be string
        if(typeof f != 'string') {
            throw new TypeError(this._messenger.getMessage({
                msg: 'faceNotString'
            }));
        }
    };

    /**
     * Validate the coordinate. Coordinates must be positive and type INT
     * @param {INT} x x-cordniate of bus position
     * @param {INT} y y-coordinate of bus position
     * @private
     */
    this._checkCoordinates = (_x, _y) => {
        if(!Number.isInteger(_x) || !Number.isInteger(_y)) {
            throw new TypeError(this._messenger.getMessage({
                msg: 'nonIntCoordinates'
            }));
        }
        if(_x < 0 || _y < 0) {
            throw new TypeError(this._messenger.getMessage({
                msg: 'noNegativeCoordinates'
            }));
        }
    };
    /**
     * Validate the FACE is valid value and trow error
     * @param {String} _f face value
     * @private
     */
    this._checkIfDirectionValid = (_f) => {
        if(!this._isDirectionValid(_f)) {
            throw new TypeError(this._messenger.getMessage({
                msg: 'wrongDirection'
            }));
        }
    };

    /**
     * Check if FACE is valid direction
     * @param {String} face  'NORTH','SOUTH','EAST','WEST'
     * @returns {Boolean}
     * @private
     */
    this._isDirectionValid = (face) => {
        return this._config.directions.indexOf(face) !== -1;
    }

    /**
     * Set the Bus position in the car park
     * @param {INT} x x-coordinate 
     * @param {INT} y y-coordinate
     * @param {String} f face direction
     * @private
     */
    this._setBusPosition = (x, y, f)=> {
        this._currentPosition = {...this._currentPosition, x, y, f: this._config.directions.indexOf(f)};
    }

    /**
     * Check if action performed is inside park only
     * @param {INT} x x-coordinate
     * @param {INT} y y-coordinate
     */
    this._isOutOfCarPark = (x, y) => {
        return this._carPark.isOutOfCarPark(x, y);
    };

    /**
     * Get Current position
     * @returns {Object} {x: int, y: int, f: string}
     * @private
     */
    this._getBusPosition = () => {
        return {
            x: this._currentPosition.x,
            y: this._currentPosition.y,
            f: this._config.directions[this._currentPosition.f]
        };
    };

    /**
     * Reset the bus position
     * @returns {Object} {x: int, y: int, f: string}
     * @private
     */
    this._resetBusPostion = () => {
        this._currentPosition.x = undefined;
        this._currentPosition.y = undefined;
        this._currentPosition.f = undefined;
    };

    /**
     * Get if first steps is made
     */
    this._getIsFirstStepMade = () => {
        return this._isFirstStepMade;
    };

    this._isFirstStepMadeFunc = () => {
        if(!this._isFirstStepMade) {
            return this.report({
                msg: 'noInitialCommand'
            });
        } else {
            return true;
        }
    };

    this._setIsFirstStepMade = (val) => {
        this._isFirstStepMade = val;
    };

    /**
     * Get Messenger instance
     * @returns {Messenger} messenger instance
     * @public
     */
    this.getMessenger = () => {
        return this._messenger;
    };
};

module.exports = Bus;