const pool = require('../db/database.js');

const bcrypt = require('bcrypt');

const hash = (password, saltRounds) => {
    return bcrypt.hash(password, saltRounds);
};

const compare_password = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};


const checkIfAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
};

const checkIfNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    next(); 
};

const getUserByUsername = async (username) => {
    try {
        const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (res.rows.length > 0) {
            return res.rows[0];
        } else {
            return null;
        }

    } catch (error) {
        console.log(error);
    }
  };
  
const getUserById = async (id) => {
    try {
        const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

        if (res.rows.length > 0) {
            return res.rows[0];
        } else {
            return null;
        }

    } catch (error) {
        console.log(error);
    }
};

const findUserByGoogleId = async (id) => {
    try {
        const res = await pool.query('SELECT * FROM users WHERE google_id::text = $1', [id]);

        if (res.rows.length > 0) {
            return res.rows[0];
        } else {
            return null;
        }

    } catch (error) {
        console.log(error);
    }
};

/*
    name is an object returned from google api that contains 
    givenName = first name and familyName = last name
*/
const createUserWithGoogleId = async (google_id, name) => {

    const firstName = name.givenName?name.givenName:'';
    const lastName = name.familyName?name.familyName:'';

    console.log(google_id)

    try {
        await pool.query('INSERT INTO users (google_id, firstName, lastName) VALUES ($1, $2, $3)', [google_id, firstName, lastName]);

        const res = await pool.query('SELECT * FROM users WHERE google_id::text = $1', [google_id]);
        console.log('User inserted successfully:', res.rows[0]);

        if (res.rows.length > 0) {
            return res.rows[0];
        } else {
            return null;
        }

    } catch (error) {
        console.error('Error inserting user:', error);
    }
};

const googleLogin = async (profile) => {

    const { id, name } = profile;

    try {
        // Check if user exists
        const user = await findUserByGoogleId(id);

        // If no user found, create new user
        if (!user) {
            return await createUserWithGoogleId(id, name);
        }

        // User already exists, return profile
        return user;

    } catch(err) {
        console.log(err);
    }

};

module.exports = {
    hash,
    compare_password,
    checkIfAuthenticated,
    checkIfNotAuthenticated,
    getUserByUsername,
    getUserById,
    googleLogin,
};