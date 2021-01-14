import { combineReducers }  from 'redux';
import curr_fiat            from './curr_fiat_reducer';
import latest_rates         from './latest_rates_reducer';
import coin_types           from './coin_types_reducer';
import history_rates        from './history_rates_reducer';
import error                from './error_reducer';
import loading              from './loading_reducer';

export default combineReducers({
    curr_fiat,
    latest_rates,
    coin_types,
    history_rates,
    error,
    loading
})
