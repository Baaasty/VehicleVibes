const { authJwt } = require('../middleware');
const controller = require('../controllers/profile.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    next();
  });

  app.get('/api/v1/profile', [authJwt.verifyToken], controller.profile);
};
