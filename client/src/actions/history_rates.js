import myAPI   from '../apis/myAPI';

export const FETCH_HISTORY_RATES_REQUEST     =       'FETCH_HISTORY_RATES_REQUEST';
export const FETCH_HISTORY_RATES_SUCCESS     =       'FETCH_HISTORY_RATES_SUCCESS';
export const FETCH_HISTORY_RATES_FAILURE     =       'FETCH_HISTORY_RATES_FAILURE';

export const fetchHistoryRates = (symbol) => async dispatch => {
  try{
    dispatch({type: FETCH_HISTORY_RATES_REQUEST});
    const history_rates = await myAPI.getHistoryRatesBySymbol(symbol);    
    dispatch({type: FETCH_HISTORY_RATES_SUCCESS,  payload: history_rates});
  }catch(e){
    console.log(e.message);
    dispatch({type: FETCH_HISTORY_RATES_FAILURE, payload: e});
  }
}
