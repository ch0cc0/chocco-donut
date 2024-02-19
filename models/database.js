if ( process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const {Pool} = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

const query = (text, params, callback) => {
    const queryPromise = pool.query(text, params);

    if (callback) {
        // If a callback is provided, use it
        queryPromise.then((res) => callback(null, res)).catch(callback);
    } else {
        // Otherwise, return the promise
        return queryPromise;
    }
};



module.exports = {
    query
};