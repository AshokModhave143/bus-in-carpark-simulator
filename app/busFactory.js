'use strict';
/**
 * Bus Facotry
 * It assembles a bus instance, assembles its dependencies
 * and returns bus instance
 */
const CarPark = require("./carPark");
const Messenger = require("./messenger");
const config = require("./config");
const Bus = require("./bus");

module.exports = new Bus(config.bus, new CarPark(config.carPark), new Messenger(config.messenger));