const authRouter = require('./auth');
const homeRouter = require('./home');
const itemsRouter = require('./items');

module.exports = (app, passport) => {
    authRouter(app, passport);
    homeRouter(app);
    itemsRouter(app);
  }