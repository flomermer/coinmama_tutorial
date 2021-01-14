const axios = require('axios');
const fs    = require('fs');
const GenralAPI  = require('../GeneralAPI');

class Coinmarketcap extends GenralAPI{
  constructor(coin_types, source_id){
    super(coin_types, source_id);
    this.API_KEY    =   'cc0d5e79-cbf1-4fcd-a789-48714a5db2d6';
    this.ROOT_URL   =   'https://pro-api.coinmarketcap.com';
  }

  async fetchData(){
    // this.data  =  require('./STATIC_DATA.json').data;  //static data to avoid dev request
    const url  = `${this.ROOT_URL}/v1/cryptocurrency/listings/latest?convert=USD`;
    const res = await axios.get(url, {
      headers: {
        'X-CMC_PRO_API_KEY': this.API_KEY
      }
    });
    this.data = res.data.data;
  }

  filterByCoinType(){
    if(!this.coin_types) return;
    this.data = this.data.filter(item => {
      for(let coin_type of this.coin_types)
        if(coin_type.coin_sym===item.symbol)
          return true;
      return false;
    });
  }

  mapDataToDbItems(){
    this.dbItems = this.data.map((item) => {
      const curr_coin_type = this.coin_types.find(coin_type => coin_type.coin_sym===item.symbol);
      return {
        coin_type_id: curr_coin_type.coin_id,
        source_id: this.source_id,
        rate: item.quote.USD.price,
        at: item.last_updated
      }
    });
  }

}

module.exports = Coinmarketcap;
