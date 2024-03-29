const pool = require('../db/database.js');

const getItems = async (req, res) => {

    console.log('Retreiving Items'); // Logging request

    try {
        const items = await pool.query('SELECT items.*, images.item_image_url FROM items LEFT JOIN item_images AS images ON items.id = images.item_id ORDER BY items.id;');

        if (items.rows.length > 0) {
            console.log('Items retrieved successfully')
            return res.status(200).send(items.rows);
        } else {
            console.log('Error no items available')
            return res.status(404).json({message: 'Error no items available'});;
        }
    
    } catch (err) {
        console.error('Error retreiving items:', err); // Logging the error
        return res.status(500).json({ message: 'An error occurred. Could not retrieve items' });
    }
};

const getItemById = async (req, res) => {

    const id = req.params.id;

    console.log('Retreiving Item'); // Logging request

    try {
        const items = await pool.query('SELECT items.*, images.item_image_url FROM items LEFT JOIN item_images AS images ON items.id = images.item_id WHERE items.id = $1;', [id]);

        if (items.rows.length > 0) {
            console.log('Items retrieved successfully')
            return res.status(200).send(items.rows[0]);
        } else {
            console.log('Error no item found')
            return res.status(404).json({message: 'Error no item found'});;
        }
    
    } catch (err) {
        console.error('Error retreiving item:', err); // Logging the error
        return res.status(500).json({ message: 'An error occurred. Could not retrieve item' });
    }
};

module.exports = {
    getItems,
    getItemById,
}