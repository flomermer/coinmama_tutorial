const db = require('../');
const {BadRequest} = require('../../utils/errors/types');
const ee =  require('../../utils/eventEmitter');

const get = async () => {
  const coin_types = await db.sql('SELECT * FROM coin_types');
  return coin_types;
}

const add = async (symbol, name) => {
  if(!symbol || !name)
    throw new BadRequest('params illegal');

  const isExists = await db.sql(`SELECT * FROM coin_types WHERE coin_sym='${symbol.toUpperCase()}'`);
  if(isExists.length>0)
    throw new BadRequest('coin already exists');

  const cb = await db.sql(`INSERT INTO coin_types (coin_sym, coin_name) VALUES ('${symbol.toUpperCase()}', '${name}')`);
  ee.emit('updateRates');
  return cb;
}

const remove = async (symbol) => {
  if(!symbol)
    throw new BadRequest('params illegal');
  const cb = await db.sql(`DELETE FROM coin_types WHERE coin_sym='${symbol.toUpperCase()}'`);
  if (cb.affectedRows===0)
    throw new BadRequest('symbol not exists');
  return true;
}

/*ALL RECORD CRUD SHOULD BE IMPLEMENTED HERE*/

module.exports = {
  get,
  add,
  remove
}
