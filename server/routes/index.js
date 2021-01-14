const express = require('express')
const router = express.Router();
const errorsHandler =   require('../utils/errors/handler');
const {NotFound}    =   require('../utils/errors/types');

router.use('/coin-rates', require('./coin-rates'));
router.use('/coin-types', require('./coin-types'));

router.get('/', (req, res) => {
  res.send('index');
});

router.all('*', (req, res) => {
  throw new NotFound();
})

router.use(errorsHandler);


module.exports = router;
