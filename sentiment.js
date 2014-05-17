var sentiment = require('sentiment');

var Twitter = require('./twitter.js').Twitter;
var twitter = new Twitter();

function Sentiment () {}

// Gets the last 15 tweets, averages those with sentiment values for a score between -5 and 5
Sentiment.prototype.avgSentiment = function (searchTerm, callback) {
  twitter.getTweets(searchTerm, function (err, res) {
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
};

exports.Sentiment = Sentiment;
