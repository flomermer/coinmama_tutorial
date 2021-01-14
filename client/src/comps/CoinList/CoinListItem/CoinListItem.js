import React from 'react';
import './CoinListItem.scss';
import {connect} from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

const CoinListItem = ({className, coin, rates, curr_fiat, onClick}) => {
  const avgRate = _.round(rates.reduce((acc, source) => acc+source.rate,0)/rates.length,2);
  if(isNaN(avgRate) || avgRate===0) return null;
  return (
    <div className={`CoinListItem ${className}`} onClick={onClick}>
      <header>
        <div className='symbol'>{coin.coin_sym}</div>
        <div className='avg'>{avgRate.toLocaleString()} {curr_fiat}</div>
      </header>
      <div className='sources'>
        <header className='full-row'>Sources Latest Prices</header>
        {rates.map(source => {
          return (
            <div className='source' key={source.source_id}>
              <div className='name'>{source.source_name}</div>
              <div className='price'>{_.round(source.rate,2).toLocaleString()} {curr_fiat}</div>
              <div className='at'>{moment(source.at).format('DD/MM HH:mm')}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = ({curr_fiat}) => { return { curr_fiat }};
export default connect(mapStateToProps)(CoinListItem);
