import React      from 'react';
import {connect}  from 'react-redux';

const withLoading = (WrappedComponent, fetchStr) => {
  const mapStateToProps = ({loading, error}) => { return { isLoading: loading[fetchStr], isError: error[fetchStr] }};
  
  class WithLoading extends React.Component {
    render() {
      return <WrappedComponent {...this.props}/>;
    }
  };
  return connect(mapStateToProps)(WithLoading);
}


export default withLoading;
