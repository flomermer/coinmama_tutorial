import React              from 'react';
import ReactDOM           from 'react-dom';
import reportWebVitals    from './reportWebVitals';
import { BrowserRouter }  from 'react-router-dom';
import { Provider }       from 'react-redux';
import thunk              from 'redux-thunk';
import reducers           from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './comps/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  ,document.getElementById('root')
);

reportWebVitals();
