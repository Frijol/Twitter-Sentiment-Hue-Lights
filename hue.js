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

// Set me up to communicate
var hue = new HueApi(hostname, username);

function Lights () {}

Lights.prototype.turnOn = function (callback) {
  hue.setLightState(1, {"on": true});
  hue.setLightState(2, {"on": true});
  if (callback) {
    callback();
  }
};

Lights.prototype.turnOff = function (callback) {
  hue.setLightState(1, {"on": false});
  hue.setLightState(2, {"on": false});
  if (callback) {
    callback();
  }
};

Lights.prototype.setHue = function (color, callback) {
  hue.setLightState(1, {"hue" : color});
  hue.setLightState(2, {"hue" : color});
  if (callback) {
    callback();
  }
};

// Saturation between 0 and 255
Lights.prototype.setSat = function (saturation, callback) {
  hue.setLightState(1, {"sat": saturation});
  hue.setLightState(2, {"sat": saturation});
  if (callback) {
    callback();
  }
};

exports.Lights = Lights;
