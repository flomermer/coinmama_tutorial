import axios from 'axios';
const env = {
  prod: {
    root_url: 'http://localhost:3000/api'
  },
  dev: {
    root_url: 'http://localhost:3000/api'
  }
}
const ROOT_URL = (process.env.NODE_ENV==='production') ?  env.prod.root_url : env.dev.root_url;

const myAPI = {
  getLatestRates: async () => {
    const latest_rates = await axios.get(`${ROOT_URL}/coin-rates/latest`);
    return latest_rates.data;
  },
  getCoinTypes:   async () => {
    const coin_types = await axios.get(`${ROOT_URL}/coin-types`);
    return coin_types.data;
  },
  getHistoryRatesBySymbol: async (symbol) => {
    const history_rates = await axios.get(`${ROOT_URL}/coin-rates/${symbol}`);
    return history_rates.data;
  }
}

export default myAPI;
