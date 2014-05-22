var hue = require("node-hue-api"),
    timeout = 2000; // 2 seconds

var displayBridges = function(bridge) {
    console.log("Hue Bridges Found: " + JSON.stringify(bridge));
};

hue.searchForBridges(timeout).then(displayBridges).done();

// var hue = require("node-hue-api");
//
// var displayBridges = function(bridge) {
//     console.log("Hue Bridges Found: " + JSON.stringify(bridge));
// };
//
// // --------------------------
// // Using a promise
// hue.locateBridges().then(displayBridges).done();
