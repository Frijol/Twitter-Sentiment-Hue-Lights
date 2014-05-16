var hueNode = require('node-hue-api');
var HueApi = hueNode.HueApi;
var lightState = hueNode.lightState;

var secrets = require('./secrets.js').hue;
var hostname = secrets.hostname;
var username = secrets.username;

var red = 65535;
var green = 25500;
var blue = 46920;

var hue = new HueApi(hostname, username);

function Lights () {};

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

// turnOn();
// setTimeout(function() {
//   setColor(blue);
//   setTimeout(function () {
//     setColor(green);
//     setTimeout(function () {
//       setColor(red);
//       setTimeout(function () {
//         turnOff();
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);
