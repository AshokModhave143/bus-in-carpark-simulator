# bus-in-carpark-simulator
The application is a simulation of a robot operated bus moving in a carpark.

Valid commands - PLACE X,Y,F | MOVE | LEFT | RIGHT
Valid faces (directions) - NORTH | SOUTH | EAST | WEST

### Tech

Bus in car park simulator uses below open source technologies to work properly:

* [Readline] - Read from command line and from file
* [Javascript] (ES6) - Modern javascript
* [Jasmine] - Testing framework

### Installation
Install the dependencies and devDependencies.

```sh
$ cd bus-in-carpark-simulator
$ npm install -d
```
Run application
```sh
$ npm run start
```
### Features
1. Run through command prompt (CLI)
```sh
$ npm run start
```
2. Run application by passing commands in file. Pass the parameter as file path
```sh
$ npm run start-file <file-path>
```
