// Node packages
var Lights = require('./hue.js').Lights;
var lights = new Lights();

var Twitter = require('./twitter.js').Twitter;
var twitter = new Twitter();

var Sentiment = require('./sentiment.js').Sentiment;
var sentiment = new Sentiment();

// For my reference
var red = 65535;
var green = 25500;
var blue = 46920;

// Start up lights neutral
lights.turnOn(function () {
  lights.setSat(0);

  // Get the sentiment from Twitter
  sentiment.avgSentiment('#Tessel', function (err, reaction) {
    if (reaction < 0) {
      lights.setHue(red);
      lights.setSat(reaction * -51); // Scale sentiment to full range of saturation
    } else {
      lights.setHue(green);
      lights.setSat(reaction * 51); // Scale sentiment to full range of saturation
    }
  });
});
