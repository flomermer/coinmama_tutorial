const db = require('../');

const get = async () => {
  const sources = await db.sql('SELECT * FROM sources');
  return sources;
}

const getObj = async () => {
  const sources = await db.sql('SELECT * FROM sources');
  const obj = sources.reduce((acc, curr) => ({ ...acc, [curr.source_name]: curr}), {})
  return obj;
}

/*ALL RECORD CRUD SHOULD BE IMPLEMENTED HERE*/

module.exports = {
  get,
  getObj
}
