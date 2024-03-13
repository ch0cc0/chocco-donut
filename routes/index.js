const authRouter = require('./auth');
const homeRouter = require('./home');
const itemsRouter = require('./items');
const cartRouter = require('./cart');
const checkoutRouter = require('./checkout');
const ordersRouter = require('./orders');
const stripeRouter = require('./stripe');

module.exports = (app, passport) => {
    authRouter(app, passport);
    homeRouter(app);
    itemsRouter(app);
    cartRouter(app);
    checkoutRouter(app);
    ordersRouter(app);
    stripeRouter(app);
  }