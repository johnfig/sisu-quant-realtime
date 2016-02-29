var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');

router.get('/', function(req, res, next) {
  yahooFinance.snapshot({
    symbol: 'SPY',
    fields: ['s', 'n', 'd1', 'l1', 'y', 'r'],
  }, function (err, snapshot) {
    this.snapshot = snapshot;
  });

  res.json({ snapshot: this.snapshot })
});

module.exports = router;

