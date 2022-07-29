const User = require("./User");
const Post = require("./Post");

User.hasMany(Post, {
  onDelete: "CASCADE",
});

Post.belongsTo(User, { as: "owner", foreignKey: "post_owner" });

module.exports = {
  User,
  Post,
};
