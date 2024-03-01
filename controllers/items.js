const pool = require('../db/database.js');

const getItems = async (req, res) => {

    console.log('Retreiving Items'); // Logging request

    try {
        const items = await pool.query('SELECT items.*, images.item_image_url FROM items LEFT JOIN item_images AS images ON items.id = images.item_id');

        if (items.rows.length > 0) {
            console.log('Items retrieved successfully')
            res.status(200).send(items.rows);
        } else {
            console.log('Error no items available')
            res.status(404).json({message: 'Error no items available'});;
        }
    
    } catch (err) {
        console.error('Error retreiving items:', err); // Logging the error
        res.status(500).json({ message: 'An error occurred. Could not retrieve items' });
    }
};

module.exports = {
    getItems,
}