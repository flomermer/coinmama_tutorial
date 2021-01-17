import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {formatPrice, formatDateTime} from '../../misc/utils';

const SourceHistory = ({className, sourceName, historyRates, curr_fiat}) => {
  return (
    <div className={`SourceHistory ${className}`}>
      <header>{sourceName}</header>
      <main>
        {_.orderBy(historyRates, 'at', 'desc').map((rate,index) => {
          return (
            <div className='record' key={index}>
              <div>{formatDateTime(rate.at)}</div>
              <div>{formatPrice(rate.rate, curr_fiat)}</div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

const mapStateToProps = ({curr_fiat}) => { return { curr_fiat }};

export default connect(mapStateToProps)(SourceHistory);
