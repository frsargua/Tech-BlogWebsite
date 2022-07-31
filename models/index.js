const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Post, {
  foreignKey: "post_owner",
  onDelete: "CASCADE",
});
Post.belongsTo(User, { foreignKey: "post_owner" });

Post.hasMany(Comment, {
  foreignKey: "comment_post_id",
  onDelete: "CASCADE",
});
Comment.belongsTo(Post, { foreignKey: "comment_post_id" });

module.exports = {
  User,
  Post,
};
