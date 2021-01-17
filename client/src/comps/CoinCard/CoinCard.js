import React from 'react';
import './CoinCard.scss';
import {connect} from 'react-redux';
import {calculateAvgRate, formatPrice, formatDateTime} from '../misc/utils';

const CoinCard = ({className, coin, rates, curr_fiat, onClick}) => {
  const avgRate = calculateAvgRate(rates);
  if(!avgRate) return null;
  return (
    <div className={`CoinCard ${className}`} onClick={onClick}>
      <header>
        <div className='symbol'>{coin.coin_sym}</div>
        <div className='avg'></div>
      </header>
      <div className='sources'>
        <header className='full-row'>Sources Latest Prices</header>
        {rates.map(source => {
          return (
            <div className='source' key={source.source_id}>
              <div className='name'>{source.source_name}</div>
              <div className='price'>{formatPrice(source.rate, curr_fiat)}</div>
              <div className='at'>{formatDateTime(source.at)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = ({curr_fiat}) => { return { curr_fiat }};
export default connect(mapStateToProps)(CoinCard);
