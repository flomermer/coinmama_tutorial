import React,{Component} from 'react';
import './CoinHistory.scss';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchHistoryRates}    from '../../actions/history_rates';
import {withRouter, Redirect} from 'react-router-dom'
import CoinCard               from '../CoinCard';
import SourceHistory          from './SourceHistory';

class CoinHistory extends Component{
  componentDidMount(){
    const {history_rates, coin} = this.props;
    if(!coin)
      return;
    if(history_rates.length===0)
      this.props.fetchHistoryRates(coin.coin_sym);
  }
  render(){
    const {coin, coin_types, latest_rates, history_rates} = this.props;
    if(!_.isEmpty(coin_types) && !coin) return <Redirect to='/home'/>;
    if(!latest_rates) return null;
    const history_rates_obj = _.groupBy(history_rates, 'source_name');

    return(
      <div className={`CoinHistory page ${this.props.className}`}>
        <header>
          <CoinCard coin={coin} rates={latest_rates} onClick={() => this.props.history.push(`/home`)} />
        </header>
        <main className='history'>
          {_.map(history_rates_obj, (historyRates, sourceName) =>
               <SourceHistory key={sourceName} sourceName={sourceName} historyRates={historyRates} />
          )}
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({curr_fiat, coin_types, latest_rates, history_rates}, ownProps) => {
  const coin = coin_types[ownProps.match.params.coin_symbol];
  return {
    curr_fiat,
    coin,
    coin_types,
    latest_rates:  latest_rates.filter(rate  => rate.coin_sym===coin.coin_sym),
    history_rates: history_rates.filter(rate => rate.coin_sym===coin.coin_sym)
}};
export default withRouter(connect(mapStateToProps, {fetchHistoryRates})(CoinHistory));
