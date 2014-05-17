// Authorizes use of twitter, some functions
// for getting recent tweets based on a search term

// Node packages
var twitter = require('node-twitter'); // You have to install this from github. The npm package is tragically outdated.

// Application-specific
var secrets = require('./secrets.js').twecrets;

// Authorize a search client
var twitterSearchClient = new twitter.SearchClient(
  secrets.consumerKey,
  secrets.consumerSecret,
  secrets.token,
  secrets.tokenSecret
);

Twitter = function () {
  this.allTweets = {}; // Collects all tweets
};

// Search for the search term, return (err, lastFifteenTweets)
Twitter.prototype.getTweets = function (searchTerm, callback) {
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
};

// Get only tweets we don't already have as (err, newTweets)
Twitter.prototype.getNewTweets = function (searchTerm, callback) {
  var self = this;

  getTweets(searchTerm, function (err, res) {
    if (err) {
      callback(err);
      return;
    }
    var newTweets = {}; // Clear newTweets
    for (var i in res) {
      var tweet = res[i];
      var tweetId = tweet.id_str;
      if (tweetId in self.allTweets) {
        // Do nothing; we already have this
      } else {
        self.allTweets[tweetId] = tweet; // Add new tweet to global dictionary
        newTweets[tweetId] = tweet; // Add new tweet to newTweets object
      }
    }
    callback(null, newTweets); // Pass back the new tweets as an object of objects
  });
};

exports.Twitter = Twitter;
