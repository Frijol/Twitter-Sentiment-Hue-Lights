//********************** Setup **********************//
// Node packages
var twitter = require('node-twitter'); // You have to install this from github. The npm package is tragically outdated.
var sentiment = require('sentiment');

// Application-specific
var secrets = require('./secrets.js').twecrets;
var searchTerm = '#Tessel'; // Any string you want to search for
var allTweets = {}; // Global: collects all tweets

// Authorize a search client
var twitterSearchClient = new twitter.SearchClient(
  secrets.consumerKey,
  secrets.consumerSecret,
  secrets.token,
  secrets.tokenSecret
);


//********************** Action **********************//
getSentiment(searchTerm, function (err, res) {
  if (err) {
    console.log(err);
  }
  console.log(res);
});

var lights = require('./hue.js');


//*************** Function Definitions ***************//
// Search for the search term, return (err, lastFifteenTweets)
function getTweets (searchTerm, callback) {
  twitterSearchClient.search({'q': searchTerm}, function(error, result) {
    if (error) {
      callback('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
    } else {
      if (result) {
        callback(null, result.statuses); // Pass back the tweets as an array of objects
      } else {
        callback('No result.');
      }
    }
  });
}

// Get only tweets we don't already have as (err, newTweets)
function getNewTweets (searchTerm, callback) {
  getTweets(searchTerm, function (err, res) {
    if (err) {
      callback(err);
      return;
    }
    var newTweets = {}; // Clear newTweets
    for (var i in res) {
      var tweet = res[i];
      var tweetId = tweet.id_str;
      if (tweetId in allTweets) {
        // Do nothing; we already have this
      } else {
        allTweets[tweetId] = tweet; // Add new tweet to global dictionary
        newTweets[tweetId] = tweet; // Add new tweet to newTweets object
      }
    }
    callback(null, newTweets); // Pass back the new tweets as an object of objects
  });
}

// Gets the last 15 tweets, averages those with sentiment values for a score between -5 and 5
function getSentiment (searchTerm, callback) {
  getTweets(searchTerm, function (err, res) {
    if (err) {
      callback(err);
    } else {
      var totalScore = 0;
      var totalCount = 0;
      for (var i in res) {
        var tweet = res[i];
        var thisSentiment = sentiment(tweet.text);
        if (thisSentiment.words.length > 0) {
          totalScore += parseFloat(thisSentiment.score);
          totalCount += 1;
        }
      }
      var avgScore = totalScore/totalCount;
      if (isNaN(avgScore)) {
        avgScore = 0;
      }
      callback(null, avgScore);
    }
  });
}
