const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");
const bcrypt = require("bcrypt");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_owner: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "user",
        key: "user_name",
      },
    },
    post_dateCreated: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      // defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    post_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_text: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
