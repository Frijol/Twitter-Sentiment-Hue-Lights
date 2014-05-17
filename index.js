//********************** Setup **********************//
// Node packages
var sentiment = require('sentiment');

var lights = require('./hue.js').Lights;
var Twitter = require('./twitter.js').Twitter;
var twitter = new Twitter();

//********************** Action **********************//
getSentiment('#Tessel', function (err, res) {
  if (err) {
    console.log(err);
  }
  console.log(res);
});

// Gets the last 15 tweets, averages those with sentiment values for a score between -5 and 5
function getSentiment (searchTerm, callback) {
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
}
