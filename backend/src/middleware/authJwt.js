const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.User;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(403).send({
      message: 'Invalid token format!',
    });
  }

  const token = authHeader.substring(7);

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        return next();
      }
    }

    return res.status(403).send({
      message: 'Require Admin Role!',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate User role!',
    });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'moderator') {
        return next();
      }
    }

    return res.status(403).send({
      message: 'Require Moderator Role!',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate Moderator role!',
    });
  }
};

const isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'moderator') {
        return next();
      }

      if (roles[i].name === 'admin') {
        return next();
      }
    }

    return res.status(403).send({
      message: 'Require Moderator or Admin Role!',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate Moderator or Admin role!',
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};
module.exports = authJwt;
