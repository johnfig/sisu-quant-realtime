var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');

router.get('/', function(req, res, next) {
  yahooFinance.snapshot({
    symbol: 'SPY',
    fields: ['s', 'n', 'd1', 'l1', 'y', 'r'],
  }, function (err, snapshot) {
    this.snapshot = snapshot;
    console.log(JSON.stringify(snapshot, null, 2));
  });

  res.render('dashboard', { title: 'Sisu Quant Realtime', snapshot: this.snapshot });
});

module.exports = router;
