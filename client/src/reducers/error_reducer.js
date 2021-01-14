
const errorReducer = (state = {}, action) => {
  const { type, payload } = action;
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);

  // not a *_REQUEST / *_FAILURE actions, so we ignore them
  if (!matches) return state;
  const [, requestName, requestState] = matches;
  const newState = {...state, [requestName]: requestState === 'FAILURE' ? payload && payload.message : '',};  

  return newState;
};

export default errorReducer;
