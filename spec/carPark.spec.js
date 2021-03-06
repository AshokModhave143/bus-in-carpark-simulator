'use strict';

/**
 * Testing carPark class
 */
const config = require("../app/config");
const CarPark = require("../app/carPark");

describe('CarPark', () => {
    let carPark;
    let xOuts = [config.carPark.startPointX - 1, config.carPark.lengthX],
        yOuts = [config.carPark.startPointY - 1, config.carPark.lengthY],
        yIns = [config.carPark.startPointY, config.carPark.lengthY - 1],
        xIns = [config.carPark.startPointX, config.carPark.lengthX - 1];

    beforeAll(() => {
        carPark = new CarPark(config.carPark);
    });

    function loopInvalidY(x, y) {
        it('shoud return invalid = TRUE if Y coordinate is OUTSIDE carPark', () => {
            expect(carPark.isOutOfCarPark(x, y)).toBe(true);
        });
    }

    const loopValidY = function (x, y) {
        it('shoud return invalid = FALSE if Y coordinate is INSIDE carPark', () => {
            expect(carPark.isOutOfCarPark(x, y)).toBe(false);
        });
    }

    const loopInvalidX = (x, y) => {
        it('shoud return invalid = TRUE if X coordinate is OUTSIDE carPark', () => {
            expect(carPark.isOutOfCarPark(x, y)).toBe(true);
        });
    }

    const loopValidX = (x, y) => {
        it('shoud return invalid = FALSE if X coordinate is INSIDE carPark', () => {
            expect(carPark.isOutOfCarPark(x, y)).toBe(false);
        });
    }

    /**
     * Y is OUTside
     */
    for (var x = config.carPark.startPointX; x < config.carPark.lengthX; ++x) {
        for (var i = 0; i < yOuts.length; ++i) {
            loopInvalidY(x, yOuts[i]);
        }
    }

    /**
     * Y is INside
     */
    for (var x = config.carPark.startPointX; x < config.carPark.lengthX; ++x) {
        for (var i = 0; i < yIns.length; ++i) {
            loopValidY(x, yIns[i]);
        }
    }

    /**
     * X is OUTside
     */
    for (var y = config.carPark.startPointY; y < config.carPark.lengthY; ++y) {
        for (var i = 0; i < xOuts.length; ++i) {
            loopInvalidX(xOuts[i], y);
        }
    }

    /**
     * X is INside
     */
    for (var y = config.carPark.startPointY; y < config.carPark.lengthY; ++y) {
        for (var i = 0; i < xIns.length; ++i) {
            loopValidX(xIns[i], y);
        }
    }
});
