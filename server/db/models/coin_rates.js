const db      =   require('../');
const moment  =   require('moment');
const _       =   require('lodash');

const get = async () => {
  const coin_rates = await db.sql(`
    SELECT *
    FROM coin_rates
    LEFT JOIN coin_types  ON coin_types.coin_id=coin_rates.coin_type_id
    LEFT JOIN sources     ON sources.source_id=coin_rates.source_id
  `);
  return coin_rates;
}

const getLatest = async () => {
  let data = await db.sql(`
    SELECT rates.*, source_name, coin_types.coin_sym, coin_types.coin_name
    FROM coin_rates rates
    LEFT JOIN sources    ON sources.source_id=rates.source_id
    LEFT JOIN coin_types ON coin_types.coin_id=rates.coin_type_id
    WHERE rates.at = ( SELECT MAX(t2.at)
                    FROM coin_rates t2
                    WHERE
                    t2.coin_type_id = rates.coin_type_id AND t2.source_id = rates.source_id
                   )
  `);
  return data;
}

const getBySymbol = async (coin_symbol) => {
  const coin_rates = await db.sql(`
    SELECT *
    FROM coin_rates
    LEFT JOIN coin_types  ON coin_types.coin_id=coin_rates.coin_type_id
    LEFT JOIN sources     ON sources.source_id=coin_rates.source_id
    WHERE coin_sym='${coin_symbol}'
  `);
  return coin_rates;
}

const addMultipleRates = async (rates) => {
  //rate stucture: {coin_type_id, source_id, rate:double, at:datetime}
  if(!rates || !Array.isArray(rates) || rates.length===0)
    throw Error('addMultipleRates failed. param illegal');

  rates = rates.filter(rate => (rate.coin_type_id && rate.source_id && rate.rate && rate.at));
  let sqlValuesStr = ''; //will be more effecient to add multiple rows at once with one sql sentence.
  rates.forEach((rate, index) => {
    sqlValuesStr += `(${rate.coin_type_id}, ${rate.source_id}, ${rate.rate}, '${moment(rate.at).format("YYYY-MM-DD HH:mm:00")}')`;
    if(index<rates.length-1) //not last
      sqlValuesStr += ',';
  })

  await db.sql(`
    INSERT INTO coin_rates
      (coin_type_id, source_id, rate, at)
    VALUES
      ${sqlValuesStr}

    ON DUPLICATE KEY UPDATE rate=rate
  `); //on duplicate key do nothing
}

/*ALL RECORD CRUD SHOULD BE IMPLEMENTED HERE*/

module.exports = {
  get,
  getLatest,
  getBySymbol,
  addMultipleRates
}
