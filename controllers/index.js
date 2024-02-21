const pool = require('../models/database.js');
const { hash } = require('../utils/helper_funcs.js');

const signup = async (req, res) => {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    console.log(`Received signup request for username: ${username}, email: ${email}`); // Logging the request

    const hashedPassword = await hash(password, 10);

    console.log('hased password');

    try {
        const result = pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, hashedPassword, email]);

        console.log('User signed up successfully');
        res.status(201).json({ message: 'User signed up successfully' });        
    } catch (err) {
        console.error('Error signing up:', err); // Logging the error
        return res.status(500).json({ message: 'An error occurred while signing up' });
    }
};

module.exports = {
    signup,
}