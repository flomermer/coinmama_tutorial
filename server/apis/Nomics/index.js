const axios = require('axios');
const fs    = require('fs');
const GenralAPI  = require('../GeneralAPI');

class Nomics extends GenralAPI{
  constructor(coin_types, source_id){
    super(coin_types, source_id);
    this.API_KEY    =   '4ff67f7fb7f68e3cc2b037894c4dd134';
    this.ROOT_URL   =   'https://api.nomics.com';

  }
  async fetchData(){
    // this.data  =  require('./STATIC_DATA.json');  //static data to avoid dev requests
    const url  = `${this.ROOT_URL}/v1/currencies/ticker`;
    const res = await axios.get(url, {
      params:{
        key: this.API_KEY,
        ids: this.coin_types.map(coin => coin.coin_sym).join(','),  //fetch only coins we care about(from coin_types table)
        interval: '1h'
      }
    });
    this.data = res.data;
  }

  filterByCoinType(){
    //no need to filter! api allowed to fetch only the coins we need.
  }

  mapDataToDbItems(){
    this.dbItems = this.data.map((item) => {
      const curr_coin_type = this.coin_types.find(coin_type => coin_type.coin_sym===item.symbol);
      return {
        coin_type_id: curr_coin_type.coin_id,
        source_id: this.source_id,
        rate: item.price,
        at: item.price_timestamp
      }
    });
  }
}

module.exports = Nomics;
