const authRouter = require('./auth');
const homeRouter = require('./home');
const itemsRouter = require('./items');
const cartRouter = require('./cart');

module.exports = (app, passport) => {
    authRouter(app, passport);
    homeRouter(app);
    itemsRouter(app);
    cartRouter(app);
  }