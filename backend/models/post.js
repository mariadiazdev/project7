'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsToMany(models.User, { through: 'UserRead', as: 'readers' });
    }
  }
  // Title, message, media Url, userId(foreign_key), user reads
  Post.init({
    title: DataTypes.STRING,
    message: DataTypes.STRING(1024),
    mediaUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post'
  });
  return Post;
};