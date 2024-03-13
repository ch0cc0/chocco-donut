require('dotenv').config();
const pool = require('../db/database.js');

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const getCartItemsQuery = `
    SELECT carts_items.item_id, carts_items.quantity, items.name, items.cost
    FROM carts_items JOIN items ON carts_items.item_id = items.id
    WHERE carts_items.cart_id = (
        SELECT id
        FROM carts
        WHERE user_id = $1
    )
`;

const checkout = async (req, res) => {
    const {userId} = req.body;
    console.log(userId);
    try {
        const cartItemsQueryResult = await pool.query(getCartItemsQuery, [userId])
        console.log(cartItemsQueryResult.rows)
        if (!(cartItemsQueryResult.rows.length > 0)) {
            console.log('Could not find cart items');
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
            success_url:`${process.env.CLIENT_URL}/orders/success`,
            cancel_url: `${process.env.CLIENT_URL}/orders/failed`,
        });
        console.log(session.id);
        req.session.stripeSessionId = session.id;
        res.status(200).json({url: session.url})
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred. Could not checkout' })
    }
};

const verifyPayment = async (req, res) => {
    const sessionId = req.session.stripeSessionId;
    console.log(sessionId);
    try {
        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid') {
            // Payment was successful, allow access to the success page
            res.status(200).json({ success: true });
        } else {
            // Payment was not successful, deny access to the success page
            res.status(403).json({ success: false, message: 'Payment not completed' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ success: false, message: 'An error occurred while verifying payment' });
    }
};


module.exports = {
    checkout,
    verifyPayment,
}