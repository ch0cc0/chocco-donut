const pool = require('../db/database.js');

const findOrCreateCart = async (userId) => {
    try {
        console.log('Finding Cart');

        const cart = await pool.query('SELECT * FROM carts WHERE user_id = $1;', [userId]);
        let cartId;
        if (cart.rows.length > 0) {
            cartId = cart.rows[0].id;
            console.log('Cart retrieved');
            return cartId;
        } else {
            console.log('Cart does not exist, creating cart');
            const newCartInsert = await pool.query('INSERT INTO carts (user_id) VALUES ($1) RETURNING *', [userId]);
            if (newCartInsert.rows.length > 0) {
                console.log('Cart created successfully');
                cartId = newCartInsert.rows[0].id;  
                console.log(cartId);
                return cartId;
            } else {
                console.log('Cart could not be created');
                return null;
            }
        }
    } catch (err) {
        console.error('Error retrieving cart:', err);
        return null;
    }
};

const getCart = async (req, res) => {

    console.log('Retrieving Cart'); // Logging request
    console.log(req.params);
    console.log(req.session);
    const userId = req.params.userId;


    if (!userId) {
        console.log('No user id');
        return res.status(404).json({message: 'Error no user found'});;
    }

    try {

        const cartId = await findOrCreateCart(userId);

        if (cartId) {
            console.log('Cart retrieved');
            console.log(cartId);
            const cart = await pool.query('SELECT items.*, item_images.item_thumbnail_url, carts_items.quantity FROM carts_items JOIN items ON carts_items.item_id = items.id JOIN carts ON carts_items.cart_id = carts.id LEFT JOIN item_images ON items.id = item_images.item_id WHERE carts.user_id = $1', [userId]);
            if (cart.rows.length > 0) {
                console.log('Cart retrieved');
                return res.status(200).send(cart.rows);
            } else {
                return res.status(404).json({ message: 'Cart found but items could not be retrieved' });
            }
        } else {
            return res.status(404).json({ message: 'Cart not found' });
        }
    
    } catch (err) {
        console.error('Error retreiving cart:', err); // Logging the error
        return res.status(500).json({ message: 'An error occurred. Could not retrieve cart' });
    }
};

const addToCart = async (req, res) => {
    const { userId, itemId, quantity } = req.body;

    console.log(`Adding item ID: ${itemId} to cart`); // Logging request

    if (!userId) {
        return res.status(404).json({message: 'Error no user found'});;
    }

    try {
        const cartId = await findOrCreateCart(userId);
        
        if (cartId) {
            console.log('Cart retrieved');

            console.log('Checking if Item is in Cart');
            const itemAlreadyInCart = await pool.query('SELECT * FROM carts_items WHERE cart_id = $1 AND item_id = $2', [cartId, itemId]);
            if (itemAlreadyInCart.rows.length > 0) {
                console.log('Updating item quantity');

                const updatedItemQuantity = await pool.query('UPDATE carts_items SET quantity = $1 WHERE cart_id = $2 AND item_id = $3 RETURNING *', [quantity, cartId, itemId]);
                
                if (updatedItemQuantity.rows.length > 0) {
                    return res.status(200).send(updatedItemQuantity.rows[0]);
                } else {
                    return res.status(404).json({ message: 'Error! Unable to update item quantity' });
                }
            } else {
                console.log('Adding item to cart');
                const addedItem = await pool.query('INSERT INTO carts_items (cart_id, item_id, quantity) VALUES ($1, $2, $3) RETURNING *', [cartId, itemId, quantity]);
                console.log(addedItem);
                if (addedItem.rows.length > 0) {
                    return res.status(200).send(addedItem.rows[0]);
                } else {
                    return res.status(404).json({ message: 'Error! Unable to add item to cart' });
                }
            }
        } else {
            return res.status(404).json({ message: 'Cart not found' });
        }
    
    } catch (err) {
        console.error('Error retreiving cart:', err); // Logging the error
        return res.status(500).json({ message: 'An error occurred. Could not retrieve cart' });
    }
};

module.exports = {
    getCart,
    addToCart,
}