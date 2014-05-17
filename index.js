// Node packages
var Twitter = require('node-twitter'); // You have to install this from github. The npm package is tragically outdated.

var Lights = require('./hue.js').Lights;
var lights = new Lights();

var Sentiment = require('./sentiment.js').Sentiment;
var sentiment = new Sentiment();

// Application-specific
var twecrets = require('./secrets.js').twecrets;
var num = 3; // How many tweets to average
var avgTweets = [];


// Start up lights neutral
lights.turnOn(function () {
  lights.setSat(1, 0);
  lights.setSat(2, 0);


  // Authorize a stream client
  var twitterStreamClient = new Twitter.StreamClient(
    twecrets.consumerKey,
    twecrets.consumerSecret,
    twecrets.token,
    twecrets.tokenSecret
  );

  // Start streaming anything containing these strings
  twitterStreamClient.start(['#tessel', 'tessel.io', '@technicalhumans', 'technical.io', 'tessel']);

  // When we get something
  twitterStreamClient.on('tweet', function(tweet) {
    var thisTweet = tweet.text;
    console.log(thisTweet);

    // Add the text to our array for averages
    avgTweets.push(thisTweet);
    if (avgTweets.length > num) {
      avgTweets.splice(0, 1);
    }

    // Get the reaction on this one tweet
    sentiment.oneSentiment(thisTweet, function (reaction) {
      // Change light 1 to reflect latest sentiment
      lights.setBySentiment(1, reaction);
    });

    // Update the average reaction on the last num tweets
    sentiment.avgSentiment(avgTweets, function (reaction) {
      // Change light 2 to reflect average sentiment
      lights.setBySentiment(2, reaction);
    });

  });
});
