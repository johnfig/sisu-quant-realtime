var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');

router.get('/', function(req, res, next) {
  yahooFinance.snapshot({
    symbols: ['SPY','CLJ16.NYM'],
    fields: ['s', 'n', 'd1', 'l1', 'y', 'r'],
  }, function (err, snapshot) {
    if (snapshot) {
      this.spySnapshot = snapshot[0];
      this.clSnapshot = snapshot[1];
    } else {
      this.spySnapshot = {lastTradePriceOnly: 'Error with Yahoo Finance Api'};
      this.clSnapshot = {lastTradePriceOnly: 'Error with Yahoo Finance Api'};
    }
  });

  lastYear = new Date().getFullYear()-1
  yahooFinance.historical({
    symbol: 'SPY',
    from: new Date(lastYear + '-12-31'),
    to: new Date(lastYear + '-12-31'),
  }, function (err, data) {
    this.spyYearStartPrice = data[0].close;
  });

  this.spyYearlyPerformance = (this.spySnapshot.lastTradePriceOnly - this.spyYearStartPrice)/this.spyYearStartPrice*100

  res.json({ spySnapshot: this.spySnapshot, clSnapshot: this.clSnapshot, spyYearlyPerformance: this.spyYearlyPerformance })
});

module.exports = router;

