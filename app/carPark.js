'use strict';
/**
 * CarPark class constructor - initialize and verifies the car park params
 * @param {Object} config Car Park configuration
 * @constructor
 */
const CarPark = function (config) {
    this._config = config;

    /**
     * Check if X,Y are inside the car park only
     * @param {INT} x x-coordinate for bus
     * @param {INT} y y-cocordinate for bus
     */
    this.isOutOfCarPark = (x, y)=> {
        if((x > (this._config.startPointX + (this._config.lengthX - 1))) ||
            (x < (this._config.startPointX)) ||
            (y > (this._config.startPointY + (this._config.lengthY - 1))) ||
            (y < (this._config.startPointY))
        ) {
            return true;
        } else {
            return false;
        }
    };
};

module.exports = CarPark;