var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');
var fred = require('fred')('1ab947af701f804360c98accc8bf46ec' || process.env.FRED_API_KEY);
var async = require("async");

router.get('/', function(req, res, next) {
  fred.series.observations('UNRATE', function(err, unemploymentRate) {
    if (unemploymentRate) {
      this.unemploymentRate = unemploymentRate.observations.pop().value
    };
  });

  data = [
           ['UNRATE', 'unemploymentRate'],
           ['FEDFUNDS', 'federalFundsRate'],
           ['CIVPART', 'laborParticipationRate'],
           ['GFDEGDQ188S', 'debtToGDP'],
         ]

  async.eachSeries(data, function(name, cb) {
    fred.series.observations(name[0], function(err, result) {
      if (result) {
        console.log(result.observations.pop().value);
        this[name[1]] = result.observations.pop().value
      };
      cb();
    });
  });

  res.render('dashboard',{
    title: 'Dashboard for Sisu Quant',
    unemploymentRate: this.unemploymentRate,
    laborParticipationRate: this.laborParticipationRate,
    federalFundsRate: this.federalFundsRate,
    debtToGDP: this.debtToGDP,
  });
});

module.exports = router;
