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
      firstName: DataTypes.STRING,
      age: DataTypes.INTEGER,
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
