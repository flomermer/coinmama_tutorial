const ACTIONS = require('../actions/latest_rates');

const latest_rates_reducer = (state=[], action) => {
  switch(action.type){
    case ACTIONS.FETCH_LATEST_RATES_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}

export default latest_rates_reducer;
