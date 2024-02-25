const authRouter = require('./auth');
const homeRouter = require('./home');

module.exports = (app, passport) => {
    authRouter(app, passport);
    homeRouter(app);
  }