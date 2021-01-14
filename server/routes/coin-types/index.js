const express           =   require('express')
const router            =   express.Router();
const coin_types_model  =   require('../../db/models/coin_types');

router.get('/', async (req,res) => {
  try{
    const coin_types = await coin_types_model.get();
    res.send(coin_types);
  }catch(e){next(e);}
});

router.post('/', async (req,res,next) => {
  try{
    const {symbol, name} = req.body;
    const cb = await coin_types_model.add(symbol, name);
    res.send(cb);
  }catch(e){next(e);}
})

router.delete('/:symbol', async (req,res,next) => {
  try{
    const cb = await coin_types_model.remove(req.params.symbol);
    res.send();
  }catch(e){next(e);}
})

module.exports = router;
