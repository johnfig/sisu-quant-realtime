var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');
var fred = require('fred')('1ab947af701f804360c98accc8bf46ec' || process.env.FRED_API_KEY);

router.get('/', function(req, res, next) {
  yahooFinance.snapshot({
    symbol: 'SPY',
    fields: ['s', 'n', 'd1', 'l1', 'y', 'r'],
  }, function (err, snapshot) {
    this.snapshot = snapshot;
    console.log(JSON.stringify(snapshot, null, 2));
  });

  fred.series.observations('UNRATE', function(err, unemploymentRate) {
    this.unemploymentRate = unemploymentRate.observations.pop().value
  });

  res.render('dashboard', { title: 'Dashboard for Sisu Quant', snapshot: this.snapshot, unemploymentRate: this.unemploymentRate });
});

module.exports = router;
