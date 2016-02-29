var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');


/* GET home page. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Sisu Quant Realtime' });
});

module.exports = router;
