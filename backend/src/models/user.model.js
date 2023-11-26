'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Role, { through: 'user_roles' });
    }
  }
  User.init(
    {
      username: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verficationToken: {
        allowNull: true,
        type: DataTypes.INTEGER,
        validate: {
          len: [6, 6],
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );
  return User;
};
