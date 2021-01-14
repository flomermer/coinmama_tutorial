import _ from 'lodash';
const ACTIONS = require('../actions/coin_types');


const latest_rates_reducer = (state={}, action) => {
  switch(action.type){
    case ACTIONS.FETCH_COIN_TYPES_SUCCESS:
      let mapCoinTypes = {...state, ..._.keyBy(action.payload, 'coin_sym')}; //convert array to mapped object
      return mapCoinTypes;

    default:
      return state;
  }
}

export default latest_rates_reducer;
