const ACTIONS = require('../actions/history_rates');


const history_rates_reducer = (state=[], action) => {
  switch(action.type){
    case ACTIONS.FETCH_HISTORY_RATES_SUCCESS:
      return [...state, ...action.payload];

    default:
      return state;
  }
}

export default history_rates_reducer;
