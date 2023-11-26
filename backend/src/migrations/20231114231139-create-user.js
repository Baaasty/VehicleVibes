'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
