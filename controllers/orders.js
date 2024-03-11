const pool = require('../db/database.js');

const getTotalCostQuery = `
    SELECT 
        SUM(carts_items.quantity * items.cost) AS total_cost
    FROM 
        carts_items
    JOIN 
        items ON carts_items.item_id = items.id
    JOIN
        carts ON carts_items.cart_id = carts.id
    WHERE
        carts.user_id = $1;
`;

const deleteAndAddCartItemsToOrder = `
    WITH deleted_items AS (
        DELETE FROM carts_items
        WHERE cart_id IN (
            SELECT id
            FROM carts
            WHERE user_id = $1
        )
        RETURNING *
    )
    INSERT INTO orders_items (order_id, item_id, quantity)
    SELECT $2 AS order_id, item_id, quantity
    FROM deleted_items
    RETURNING *;
`;

const getOrdersWithThumbnails = `
    SELECT 
        orders.id AS order_id,
        orders.user_id,
        orders.total_cost,
        orders.status,
        orders.created_at AS order_created_at,
        ARRAY_AGG(item_images.item_thumbnail_url) AS item_thumbnails
    FROM 
        orders
    JOIN 
        orders_items ON orders.id = orders_items.order_id
    JOIN 
        items ON orders_items.item_id = items.id
    JOIN 
        item_images ON items.id = item_images.item_id
    WHERE 
        orders.user_id = $1
    GROUP BY 
        orders.id, orders.user_id, orders.total_cost, orders.status, orders.created_at;
`;

const getOrderDetailsAndItems = `
    SELECT 
        items.*,
        orders_items.quantity,
        item_images.item_thumbnail_url
    FROM 
        orders_items
    JOIN 
        items ON orders_items.item_id = items.id
    JOIN 
        item_images ON items.id = item_images.item_id
    WHERE 
        orders_items.order_id = $1;
`;

const createOrder = async (req, res) => {
    console.log('Creating a Order');
    const { userId } = req.body;
    if (!userId) {
        console.log('No user id');
        return res.status(404).json({ message: 'No user id provided' });
    }

    try {
        const status = "pending";
        const totalCostQueryResults = await pool.query(getTotalCostQuery, [userId]);
        if (!(totalCostQueryResults.rows.length > 0)) {
            console.log('Error getting total cost of order')
            return res.status(404).json({ message: 'Error getting total cost of order' });
        }
        const totalCost = totalCostQueryResults.rows[0].total_cost;
        console.log('Total Cost: ', totalCost);

        const newOrderQueryResults = await pool.query('INSERT INTO orders (user_id, total_cost, status) VALUES ($1, $2, $3) RETURNING *',[userId, totalCost, status]);
        
        if (newOrderQueryResults.rows.length > 0) {
            console.log('New Order Created');
            console.log('Inserting cart items into order and wiping cart items');
            const orderId = newOrderQueryResults.rows[0].id;
            const newOrderItems = await pool.query(deleteAndAddCartItemsToOrder, [userId, orderId]);
            
            if (newOrderItems.rows.length > 0) {
                return res.status(200).send(newOrderItems.rows);
            } else {
                console.log('Unable to add items into order');
                return res.status(404).json({ message: 'Unable to add items into order' });
            }

        } else {
            console.log('Error creating order')
            return res.status(404).json({message: 'Error creating order'})
        }
    } catch (error) {
        console.error('Error creating order:', error); // Logging the error
        return res.status(500).json({ message: `Error: ${error}` });
    }

};

const getOrders = async (req, res) => {
    const {userId} = req.params;
    if (!userId) {
        console.log('No user id');
        return res.status(404).json({ message: 'No user id provided' });
    }

    try {
        console.log('Getting orders assciated with user ID: ', userId);
        const ordersWithThumbnails = await pool.query(getOrdersWithThumbnails, [userId]);
        if (ordersWithThumbnails.rows.length > 0) {
            console.log('Orders retrieved');
            return res.status(200).send(ordersWithThumbnails.rows);
        } else {
            console.log('No orders found for user');
            return res.status(200).send([]);
        }
    } catch (error) {
        console.error('Error retrieving orders:', error);
        return res.status(500).json({ message: 'An error occurred while retrieving orders' });
    }
};

const getOrderDetails = async (req, res) => {
    const {orderId} = req.params;

    if (!orderId) {
        console.log('No order id');
        return res.status(404).json({ message: 'No order id provided' });
    }

    try {
        console.log('Getting order details for order ID: ', orderId);
        const orderDetails = await pool.query(getOrderDetailsAndItems, [orderId]);
        if (orderDetails.rows.length > 0) {
            console.log('Order details retrieved');
            return res.status(200).send(orderDetails.rows);
        } else {
            console.log('Problem retrieving order details');
            return res.status(404).json({message: 'An error occurred while retrieving order details' });
        }        
    } catch (error) {
        console.error('Error retrieving order details:', error);
        return res.status(500).json({ message: 'An error occurred while retrieving order details' });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderDetails,
}