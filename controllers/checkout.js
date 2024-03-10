require('dotenv').config();
const pool = require('../db/database.js');
const cart = require('../routes/cart/index.js');

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const checkout = async (req, res) => {
    const {userId} = req.body;
    console.log(userId);
    try {
        const cartItemsQueryResult = await pool.query('SELECT items.*, carts_items.quantity FROM carts_items JOIN items ON carts_items.item_id = items.id JOIN carts ON carts_items.cart_id = carts.id WHERE carts.user_id = $1', [userId])
        console.log(cartItemsQueryResult.rows)
        if (!(cartItemsQueryResult.rows.length > 0)) {
            return res.status(404).json({message: 'Could not find cart items'})
        }
        const cartItems = cartItemsQueryResult.rows;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: cartItems.map(item => {
                return {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: (item.cost * 100)
                    },
                    quantity: item.quantity
                }
            }),
            success_url:`${process.env.CLIENT_URL}/order/success`,
            cancel_url: `${process.env.CLIENT_URL}/order/failed`,
        });

        res.status(200).json({url: session.url})
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred. Could not checkout' })
    }
};

module.exports = {
    checkout,
}