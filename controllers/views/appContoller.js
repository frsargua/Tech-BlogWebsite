const { User, Post, Comment } = require("../../models");

const landingPage_get = async (req, res) => {
  let { logged_in: loggedIn } = req.session;
  const allPost = await Post.findAll({
    raw: true,
  });
  res.render("all", { allPost, loggedIn });
};

const login_get = async (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  let loggedIn = req.session.logged_in;
  res.render("SignIn", { loggedIn, error });
};

const sigUps_get = async (req, res) => {
  loggedIn = req.session.logged_in;
  res.render("SignUp", { loggedIn });
};

const getPostById = async (req, res) => {
  let { logged_in: loggedIn } = req.session;
  let { id: postId } = req.params;

  const singlePost = await Post.findByPk(postId, {
    raw: true,
  });

  const commentsByPost = await Comment.findAll({
    raw: true,
    where: {
      comment_post_id: postId,
    },
  });

  res.render("singlePost", { singlePost, commentsByPost, loggedIn });
};

const dashBoard_get = async (req, res) => {
  let { user_id, logged_in: loggedIn } = req.session;
  let userPosts = await Post.findAll({
    raw: true,
    where: {
      post_owner: user_id,
    },
  });

  res.render("dashBoard", { userPosts, loggedIn });
};

module.exports = {
  login_get,
  dashBoard_get,
  landingPage_get,
  getPostById,
  sigUps_get,
};
