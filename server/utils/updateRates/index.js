const Coinmarketcap         =   require('../../apis/Coinmarketcap');
const Cryptocompare         =   require('../../apis/Cryptocompare');
const Nomics                =   require('../../apis/Nomics');
const coin_types_model      =   require('../../db/models/coin_types');
const sources_model         =   require('../../db/models/sources');
const coin_rates_model      =   require('../../db/models/coin_rates');

const updateRates = async () => {
  try{
    const coin_types =  await coin_types_model.get();
    const sources    =  await sources_model.getObj();

    //Coinmarketcap api:
    const coinmarketcap = new Coinmarketcap(coin_types, sources['coinmarketcap'].source_id);
    await coinmarketcap.execute();

    //Cryptocompare api:
    const cryptocompare = new Cryptocompare(coin_types, sources['cryptocompare'].source_id);
    await cryptocompare.execute();

    //Nomics api:
    const nomics = new Nomics(coin_types, sources['nomics'].source_id);
    await nomics.execute();

    const multiple_rates = [...coinmarketcap.getDbItems(), ...cryptocompare.getDbItems(), ...nomics.getDbItems()];
    await coin_rates_model.addMultipleRates(multiple_rates);
    console.log('*** update rates finished ***');
  } catch(e){
    console.log(`${e.name}: ${e.message}`);
  }
}

module.exports = updateRates;
