import myAPI   from '../apis/myAPI';

export const FETCH_LATEST_RATES_REQUEST     =       'FETCH_LATEST_RATES_REQUEST';
export const FETCH_LATEST_RATES_SUCCESS     =       'FETCH_LATEST_RATES_SUCCESS';
export const FETCH_LATEST_RATES_FAILURE     =       'FETCH_LATEST_RATES_FAILURE';

export const fetchLatestRates = () => async dispatch => {
  try{
    dispatch({type: FETCH_LATEST_RATES_REQUEST});
    const latest_rates = await myAPI.getLatestRates();    
    dispatch({type: FETCH_LATEST_RATES_SUCCESS,  payload: latest_rates});
  }catch(e){
    console.log(e.message);
    dispatch({type: FETCH_LATEST_RATES_FAILURE, payload: e});
    setTimeout(function(){
      fetchLatestRates()(dispatch); //will try fetching again after timer.
    },7000);
  }
}
