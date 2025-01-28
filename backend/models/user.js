'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Post, { through: 'UserRead', as: 'readPosts' });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true, 
        msg: 'Email address must be unique' 
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};