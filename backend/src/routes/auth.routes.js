const { verifyRegister } = require('../middleware');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    next();
  });

  app.post(
    '/api/v1/auth/register',
    [verifyRegister.checkDuplicateUsernameOrEmail, verifyRegister.checkRolesExisted],
    controller.register
  );

  app.post('/api/v1/auth/login', controller.login);

  app.put('/api/v1/auth/verify', controller.verify);
};
