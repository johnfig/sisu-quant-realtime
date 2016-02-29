var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');

router.get('/', function(req, res, next) {
  yahooFinance.snapshot({
    symbols: ['SPY','CLJ16.NYM'],
    fields: ['s', 'n', 'd1', 'l1', 'y', 'r'],
  }, function (err, snapshot) {
    this.spySnapshot = snapshot[0];
    this.clSnapshot = snapshot[1];
  });

  res.json({ spySnapshot: this.spySnapshot, clSnapshot: this.clSnapshot })
});

module.exports = router;

