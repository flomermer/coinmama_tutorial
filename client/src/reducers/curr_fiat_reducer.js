const ACTIONS = require('../actions/curr_fiat');

const curr_fiat_reducer = (state='USD', action) => {
  switch(action.type){
    case ACTIONS.SET_CURR_FIAT:
      return action.payload;

    default:
      return state;
  }
}

export default curr_fiat_reducer;
