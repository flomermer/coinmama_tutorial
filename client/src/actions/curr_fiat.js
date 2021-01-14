export const SET_CURR_FIAT      =       'SET_CURR_FIAT';

export const setCurrFiat = (fiatStr) => {
  return {
    type: SET_CURR_FIAT,
    payload: fiatStr
  }
}
