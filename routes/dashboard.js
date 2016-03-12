var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');
var fred = require('fred')('1ab947af701f804360c98accc8bf46ec' || process.env.FRED_API_KEY);
var async = require("async");

var data = [
             ['UNRATE', 'unemploymentRate'],
             ['FEDFUNDS', 'federalFundsRate'],
             ['CIVPART', 'laborParticipationRate'],
             ['GFDEGDQ188S', 'debtToGDP'],
             ['MORTGAGE15US', 'fifteenYearMortgageRate'],
             ['MORTGAGE30US', 'thirtyYearMortgageRate'],
             ['DRSFRMACBS', 'housingDelinquencyRate'],
             ['DGS5', 'fiveYearTreasury'],
             ['DGS10', 'tenYearTreasury'],
             ['DGS30', 'thirtyYearTreasury'],
           ]

router.get('/', function(req, res, next) {
  setEconomicData(data)

  res.render('dashboard',{
    title: 'Sisu Quant Economic Dashboard'
  });
});

function setEconomicData(data) {
  async.eachSeries(data, function(name, cb) {
    fred.series.observations(name[0], function(err, result) {
      if (result) {
        this[name[1]] = result.observations.pop().value
      };
      cb();
    });
  });
}

module.exports = router;
