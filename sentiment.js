var sentiment = require('sentiment');

function Sentiment () {}

// Takes the text of a single tweet as a string, returns sentiment score as a float
Sentiment.prototype.oneSentiment = function (tweet, callback) {
  var reaction = sentiment(tweet).score;
  
  // Contain enthusiasm
  if (reaction > 5) {
    reaction = 5;
  }
  if (reaction < -5) {
    reaction = -5;
  }

  callback(reaction);
};

// Takes an array of strings of tweet text, returns average sentiment score as a float
Sentiment.prototype.avgSentiment = function (tweets, callback) {
  var self = this;
  var total = 0;
  for (var i in tweets) {
    self.oneSentiment(tweets[i], function(res) {
      total += res;
    });
  }
  var avg = total/tweets.length;
  callback(avg);
};

exports.Sentiment = Sentiment;
