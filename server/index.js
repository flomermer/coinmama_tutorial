const express       =   require('express');
const app           =   express();
const db            =   require('./db');
const routes        =   require('./routes');
const path          =   require('path');
const updateRates   =   require('./utils/updateRates');
const cors          =   require('cors');
const config        =   require('./config');
const ee            =   require('./utils/eventEmitter');

const run = async () => {
  let updateTimer;
  try{
    app.use(cors()); //just for tutorial -> allow all cors
    app.use(require('body-parser').json());

    app.use('/api', routes);
    app.use('/', express.static(config.CLIENT_BUILD_DIR)) //serve react manager client
    app.get('/*', (req, res) => {
      res.sendFile(path.join(config.CLIENT_BUILD_DIR, '/index.html'));
    })

    await db.init();
    app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`));

    ee.on('updateRates', updateRates);
    console.log(`*** update every: ${config.UPDATE_TIMER_MINUTES} minutes ***`);
    updateTimer = setInterval(() => ee.emit('updateRates'), 1000*60*config.UPDATE_TIMER_MINUTES); //to set interval timer visit ./config
    ee.emit('updateRates');    //also coin_type_model.add() emit('updateRates') to update new coin rates instead of waiting for timer.
  }catch(e){
    db.close();
    clearInterval(updateTimer);
    console.log(e.message);
  }
}

run();
