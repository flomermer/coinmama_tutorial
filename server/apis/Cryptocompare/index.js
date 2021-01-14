const axios = require('axios');
const fs    = require('fs');
const GenralAPI  = require('../GeneralAPI');

class Cryptocompare extends GenralAPI{
  constructor(coin_types, source_id){
    super(coin_types, source_id);
    this.API_KEY    =   'cc0d5e79-cbf1-4fcd-a789-48714a5db2d6';
    this.ROOT_URL   =   'https://min-api.cryptocompare.com';
  }

  async fetchData(){
    // this.data  =  require('./STATIC_DATA.json');  //static data to avoid dev request
    const url  = `${this.ROOT_URL}/data/pricemulti`;
    const res = await axios.get(url, {
      params:{
        tsyms: 'USD',
        fsyms: this.coin_types.map(coin => coin.coin_sym).join(','),  //fetch only coins we care about(from coin_types table)        
      },
      headers: {
        "Authorization": `Apikey ${this.API_KEY}`
      }
    });
    this.data = res.data;

    this.data  =  Object.keys(this.data).map(key => {
      return {
        symbol: key,
        price:  this.data[key].USD
      }
    })
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
        rate: item.price,
        at: new Date()
      }
    });
  }

}

module.exports = Cryptocompare;
