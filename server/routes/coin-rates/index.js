const express             =     require('express')
const router              =     express.Router();
const coin_rates_model    =     require('../../db/models/coin_rates');

router.get('/', async (req,res) => {
  const allRates = await coin_rates_model.get();
  res.send(allRates);
});

router.get('/latest', async (req, res) => {
  const cb = await coin_rates_model.getLatest();
  res.send(cb);
});

router.get('/:coin_symbol', async (req,res) => {
  const ratesBySymbol = await coin_rates_model.getBySymbol(req.params.coin_symbol);
  res.send(ratesBySymbol);
})

module.exports = router;
