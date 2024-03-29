const pool = require('../db/database.js');

const updateUser = async (req, res) => {

    const { userId, firstName, lastName, email } = req.body;
    console.log('Attempting to Update User Profile');

    if (!userId || !firstName || !lastName || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await pool.query('UPDATE users SET firstName = $2, lastName = $3, email = $4 WHERE id = $1', [userId, firstName, lastName, email]);
        if (user.rowCount > 0) {
            console.log('User Profile Updated');
            return res.status(200).json({ message: 'User Profile Updated' });
        } else {
            console.log('User Update Fail');
            return res.status(404).json({ message: 'User Update Failed' });
        }
    } catch (err) {
        console.error('Error updating user:', err); // Logging the error
        return res.status(500).json({ message: 'An error occurred. Could not update user' });
    }
};

const getUserInfo = async (req, res) => {

    console.log(req.session);
    
    const { userId } = req.session;

    console.log('Attempting to get User Info');

    if (!userId) {
        return res.status(400).json({ message: 'No User ID' });
    }

    try {
        const user = await pool.query('SELECT username, email, firstName, lastName FROM users WHERE id = $1', [userId]);
        if (user.rows.length > 0) {
            console.log('User Info Received');
            return res.status(200).send(user.rows[0]);
        } else {
            console.log('Failed To Get User Info');
            return res.status(404).json({ message: 'Failed To Get User Info' });
        }
    } catch (err) {
        console.error('Error getting user:', err); // Logging the error
        return res.status(500).json({ message: 'An error occurred. Could not get user' });
    }
};

module.exports = {
    updateUser,
    getUserInfo
}