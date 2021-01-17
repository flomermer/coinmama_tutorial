import React from 'react';
import './CoinList.scss';
import _ from 'lodash';
import {connect}            from 'react-redux';
import {withRouter}         from 'react-router-dom';
import withLoading          from '../misc/hoc/withLoading';
import CoinCard             from '../CoinCard';

const CoinList = (props) => {
  const {className, isLoading, isError, latest_rates, coin_types, history} = props;
  if(isLoading)     return (<div>loading...</div>);
  if(isError)       return (<div>error!</div>);
  if(!latest_rates || !coin_types)  return null;

  return (
    <div className={`CoinList ${className}`}>
        {_.map(coin_types, coin => {
          const filteredRates = latest_rates.filter(rate => rate.coin_type_id===coin.coin_id);
          return  <CoinCard       key={coin.coin_sym} coin={coin} rates={filteredRates}
                                  onClick={() => history.push(`/history/${coin.coin_sym}`)}
                  />;
        })}
    </div>
  );
}

const mapStateToProps = ({latest_rates, curr_fiat, coin_types}) => { return { latest_rates, curr_fiat, coin_types }};
const CoinListWithLoading = withRouter(withLoading(CoinList, 'FETCH_LATEST_RATES'));
export default connect(mapStateToProps)(CoinListWithLoading);
