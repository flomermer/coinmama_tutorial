const {BadRequest} = require('../utils/errors/types');

class GeneralAPI{
  constructor(coin_types, source_id){
    this.data       =   null;
    this.dbItems    =   [];
    this.coin_types =   coin_types;
    this.source_id  =   source_id;
  }
  async fetchData(){}
  filterByCoinType(){}
  mapDataToDbItems(){}

  async execute(){
    await this.fetchData();
    if(!this.data || !Array.isArray(this.data))
      throw new BadRequest(`${this.constructor.name} fetch failed`);

    this.filterByCoinType();
    this.mapDataToDbItems();
  }

  getData(){return this.data;}
  getDbItems(){return this.dbItems;}
}

module.exports = GeneralAPI;
