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
             ['DGS5', 'fiveYearTreasury'],
             ['DGS10', 'tenYearTreasury'],
             ['DGS30', 'thirtyYearTreasury'],
           ]

router.get('/', function(req, res, next) {
  fred.series.observations('UNRATE', function(err, unemploymentRate) {
    if (unemploymentRate) {
      this.unemploymentRate = unemploymentRate.observations.pop().value
    };
  });

  setEconomicData(data)

  res.render('dashboard',{
    title: 'Sisu Quant Economic Dashboard',
    unemploymentRate: this.unemploymentRate,
    laborParticipationRate: this.laborParticipationRate,
    federalFundsRate: this.federalFundsRate,
    debtToGDP: this.debtToGDP,
    averageMortgageRate: this.averageMortgageRate,
    fivYearTreasury: this.fivYearTreasury,
    tenYearTreasury: this.tenYearTreasury,
    thirtyYearTreasury: this.thirtyYearTreasury,
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
