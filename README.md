# coinmama-tutorial

### running tutorial instructions:
  - clone repository
  - start docker-compose using: ```docker-compose up -d```
  - wait a bit before server initialization
  - enter client app on: ```http://localhost:3000```

 ### update process:
  - sources: ```coinmarketcap.com | cryptocompare.com | nomics.com```
  - every source will updates the current coin_types records which exists in ```coin_types``` table
  - you can add a new coin_type to ```coin_types``` table and it will work automatically.
