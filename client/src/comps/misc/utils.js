import _ from 'lodash';
import moment from 'moment';

export const calculateAvgRate = (rates) => {
  const avgRate = _.round(rates.reduce((acc, source) => acc+source.rate,0)/rates.length,2);
  if(isNaN(avgRate) || avgRate===0)
    return null;
  return avgRate;
}

export const formatPrice = (number, fiatStr) => {
  return `${_.round(number,2).toFixed(2).toLocaleString()} ${fiatStr}`;
}

export const formatDateTime = (datetime) => {
  return moment(datetime).format('DD/MM/YY HH:mm');
}
