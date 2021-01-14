import React,{Component} from 'react';
import './CoinHistory.scss';
import _ from 'lodash';
import moment from 'moment';
import {connect} from 'react-redux';
import {fetchHistoryRates}    from '../../actions/history_rates';
import {withRouter, Redirect} from 'react-router-dom'
import CoinListItem           from '../CoinList/CoinListItem';

class CoinHistory extends Component{
  componentDidMount(){
    const {history_rates, coin} = this.props;
    if(!coin) //page refreshed! no data has been fetched yet.
      return;
    if((history_rates.length===0 || history_rates.filter(rate => rate.coin_sym===coin.coin_sym).length===0))
      this.props.fetchHistoryRates(coin.coin_sym);
  }
  renderSourceHistory(source_name, history_rates){
    return (
      <div className='source-history' key={source_name}>
        <header>{source_name}</header>
        <main>
          {_.orderBy(history_rates, 'at', 'desc').map((rate,index) => {
            return (
              <div className='record' key={index}>
                <div>{moment(rate.at).format('DD/MM/YY HH:mm')}</div>
                <div>{_.round(rate.rate,2).toLocaleString()} {this.props.curr_fiat}</div>
              </div>
            );
          })}
        </main>
      </div>
    );
  }
  render(){
    const {coin, coin_types, latest_rates, history_rates} = this.props;
    if(!_.isEmpty(coin_types) && !coin) return <Redirect to='/home'/>;
    if(!latest_rates) return null;
    let history_rates_obj = _.groupBy(history_rates, 'source_name');

    return(
      <div className={`CoinHistory page ${this.props.className}`}>
        <header>
          <CoinListItem   className='card' coin={coin}
                          rates={latest_rates.filter(rate => rate.coin_type_id===coin.coin_id)}
                          onClick={() => this.props.history.push(`/home`)}
          />;
        </header>
        <main className='history'>
          {_.map(history_rates_obj, (history_rates, source_name) => {
            return this.renderSourceHistory(source_name, history_rates);
          })}
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({curr_fiat, coin_types, latest_rates, history_rates}, ownProps) => {return {
  curr_fiat,
  coin: coin_types[ownProps.match.params.coin_symbol],
  coin_types,
  latest_rates,
  history_rates
}};
export default withRouter(connect(mapStateToProps, {fetchHistoryRates})(CoinHistory));
