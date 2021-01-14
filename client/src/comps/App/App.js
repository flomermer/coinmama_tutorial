import React, {Component} from 'react';
import './App.scss';
import _ from 'lodash';
import {Route, Redirect,Switch}     from 'react-router-dom';
import {connect}                    from 'react-redux';
import {fetchCoinTypes}             from '../../actions/coin_types';
import {fetchLatestRates}           from '../../actions/latest_rates';
import {UPDATE_TIMER_MINUTES}       from '../../consts';
import withLoading                  from '../misc/hoc/withLoading';
import CoinList                     from '../CoinList';
import CoinHistory                  from '../CoinHistory';

class App extends Component{
  componentDidMount(){
    if(_.isEmpty(this.props.coin_types))
      this.props.fetchCoinTypes();

    this.props.fetchLatestRates();
    this.updateTimer = setInterval(this.props.fetchLatestRates, UPDATE_TIMER_MINUTES*60*1000);    
  }
  componentWillUnmount(){
    clearInterval(this.updateTimer);
  }
  render(){
    const {isLoading, isError} = this.props;
    if(isLoading) return (<div>loading...</div>);
    if(isError)   return (<div>error with fetching coin-types</div>);
    return(
      <div className='App'>
        <Switch>
          <Route  path='/history/:coin_symbol'  exact><CoinHistory/></Route>
          <Route  path='/home'                  exact><CoinList className='page' /></Route>
          <Route  path='/'>
            <Redirect to='/home' />
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({coin_types, latest_rates}) => { return { coin_types, latest_rates }};
const AppWithLoading = withLoading(App, 'FETCH_COIN_TYPES');
export default connect(mapStateToProps, {fetchCoinTypes, fetchLatestRates})(AppWithLoading);
