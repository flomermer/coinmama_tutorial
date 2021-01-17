const waitPort      =   require('wait-port');
const fs            =   require('fs');
const mysql         =   require('mysql');

const {
    MYSQL_HOST: HOST,
    MYSQL_HOST_FILE: HOST_FILE,
    MYSQL_USER: USER,
    MYSQL_USER_FILE: USER_FILE,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_PASSWORD_FILE: PASSWORD_FILE,
    MYSQL_DB: DB,
    MYSQL_DB_FILE: DB_FILE,
} = process.env;

let pool;

const init = async () => {
    const host = HOST_FILE ? fs.readFileSync(HOST_FILE) : HOST;
    const user = USER_FILE ? fs.readFileSync(USER_FILE) : USER;
    const password = PASSWORD_FILE ? fs.readFileSync(PASSWORD_FILE) : PASSWORD;
    const database = DB_FILE ? fs.readFileSync(DB_FILE) : DB;

    await waitPort({ host, port : 3306});

    pool = mysql.createPool({
        connectionLimit: 5,
        host,
        user,
        password,
        database,
    });
}

const close = async () => {
    return new Promise((res, rej) => {
        pool.end(err => {
            if (err) rej(err);
            else res();
        });
    });
}

const sql = async (sql_str) => {
  return new Promise((resolve,reject) => {
    pool.query(sql_str, (err, cb) => {
      if(err){
        //console.log(err);
        reject(err);
      }
      resolve(cb);
    })
  })
}

module.exports = {
    init,
    close,
    sql
};
