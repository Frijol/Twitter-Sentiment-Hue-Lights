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

Lights.prototype.setHue = function (whichLight, color, callback) {
  hue.setLightState(whichLight, {"hue" : color});
  if (callback) {
    callback();
  }
};

// Saturation between 0 and 255
Lights.prototype.setSat = function (whichLight, saturation, callback) {
  hue.setLightState(whichLight, {"sat": saturation});
  if (callback) {
    callback();
  }
};

Lights.prototype.setBySentiment = function (whichLight, reaction, callback) {
  var self = this;
  if (reaction < 0) {
    self.setHue(whichLight, red); // Boo, hiss
    self.setSat(whichLight, reaction * -51); // Scale sentiment to full range of saturation
  } else {
    self.setHue(whichLight, green); // Oh yeah
    self.setSat(whichLight, reaction * 51); // Scale sentiment to full range of saturation
  }
  if (callback) {
    callback();
  }
};

exports.Lights = Lights;
