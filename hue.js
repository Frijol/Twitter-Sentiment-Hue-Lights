// Imports my username and hostname for hue
// Functions for messing with two lights
// ~synchronously

// TODO: automatically determine how many lights
// I think the library already has this actually

// Node library for Hue
var hueNode = require('node-hue-api');
var HueApi = hueNode.HueApi;

// Login information
var secrets = require('./secrets.js').hue;
var hostname = secrets.hostname;
var username = secrets.username;

// For my reference
var red = 65535;
var green = 25500;
var blue = 46920;

// Set me up to communicate
var hue = new HueApi(hostname, username);

function Lights () {}

Lights.prototype.turnOn = function () {
  hue.setLightState(1, {"on": true});
  hue.setLightState(2, {"on": true});
};

Lights.prototype.turnOff = function () {
  hue.setLightState(1, {"on": false});
  hue.setLightState(2, {"on": false});
};

Lights.prototype.setColor = function (color) {
  hue.setLightState(1, {"hue" : color, "sat": 255});
  hue.setLightState(2, {"hue" : color, "sat": 255});
};

exports.Lights = Lights;
