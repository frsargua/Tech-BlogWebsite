const e = require("express");
const { Post, Comment } = require("../../models");

const landingPage_get = async (req, res) => {
  let session = req.session;

  const allPost = await Post.findAll({
    raw: true,
  });
  console.log(session);
  res.render("all", { allPost, session });
};

const login_get = async (req, res) => {
  const { logged_in: loggedIn, error } = await req.session;
  delete req.session.error;
  res.render("SignIn", { loggedIn, error });
};

const sigUps_get = async (req, res) => {
  loggedIn = req.session.logged_in;
  res.render("SignUp", { loggedIn });
};

const getPostById = async (req, res) => {
  let session = req.session;
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
  // console.log(commentsByPost);
  let commentsByPostVerifier = commentsByPost.map((el) => {
    el.isOwner = el.comment_owner == session.user_name;
    return el;
  });

  res.render("singlePost", { singlePost, commentsByPostVerifier, session });
};

const dashBoard_get = async (req, res) => {
  let session = req.session;
  let userPosts = await Post.findAll({
    raw: true,
    where: {
      post_owner: session.user_name,
    },
  });

  res.render("dashBoard", { userPosts, session });
};

module.exports = {
  login_get,
  dashBoard_get,
  landingPage_get,
  getPostById,
  sigUps_get,
};
