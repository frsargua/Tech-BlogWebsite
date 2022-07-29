const User = require("./User");
const Post = require("./Post");

User.hasMany(Post, {
  foreignKey: "post_owner",
  onDelete: "CASCADE",
});

Post.belongsTo(User, { foreignKey: "post_owner" });

module.exports = {
  User,
  Post,
};
