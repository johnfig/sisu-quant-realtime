var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');
var fred = require('fred')('1ab947af701f804360c98accc8bf46ec' || process.env.FRED_API_KEY);

router.get('/', function(req, res, next) {
  fred.series.observations('UNRATE', function(err, unemploymentRate) {
    if (unemploymentRate) {
      this.unemploymentRate = unemploymentRate.observations.pop().value
    };
  });

  fred.series.observations('FEDFUNDS', function(err, federalFundsRate) {
    if (federalFundsRate) {
      this.federalFundsRate = federalFundsRate.observations.pop().value
    };
  });

  fred.series.observations('CIVPART', function(err, laborParticipationRate) {
    if (laborParticipationRate) {
      this.laborParticipationRate = laborParticipationRate.observations.pop().value
    };
  });

  fred.series.observations('GFDEGDQ188S', function(err, debtToGDP) {
    if (debtToGDP) {
      this.debtToGDP = debtToGDP.observations.pop().value
    };
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
