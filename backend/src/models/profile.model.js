'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      this.hasOne(models.User);
    }
  }
  Profile.init(
    {
      firstname: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      bio: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Profile',
      tableName: 'profiles',
    }
  );
  return Profile;
};
