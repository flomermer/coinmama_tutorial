import myAPI   from '../apis/myAPI';

export const FETCH_COIN_TYPES_REQUEST     =       'FETCH_COIN_TYPES_REQUEST';
export const FETCH_COIN_TYPES_SUCCESS     =       'FETCH_COIN_TYPES_SUCCESS';
export const FETCH_COIN_TYPES_FAILURE     =       'FETCH_COIN_TYPES_FAILURE';

export const fetchCoinTypes = () => async dispatch => {
  try{
    dispatch({type: FETCH_COIN_TYPES_REQUEST});
    const coin_types = await myAPI.getCoinTypes();
    dispatch({type: FETCH_COIN_TYPES_SUCCESS,  payload: coin_types});
  }catch(e){
    console.log(e.message);
    dispatch({type: FETCH_COIN_TYPES_FAILURE, payload: e});
    setTimeout(function(){
      fetchCoinTypes()(dispatch); //will try fetching again after timer.
    },7000);
  }
}
