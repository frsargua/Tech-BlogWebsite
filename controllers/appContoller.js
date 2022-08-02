const { User, Post, Comment } = require("../models");

const landing_page = async (req, res) => {
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

const login_post = async (req, res) => {
  const { user_name, password } = req.body;

  const userData = await User.findOne({
    where: { user_name: user_name },
  });
  if (!userData) {
    req.session.error = "Incorrect username";
    return res.status(400).redirect("/signin");
  }

  const validPassword = await userData.checkPassword(password);

  if (!validPassword) {
    req.session.error = "Invalid password";
    return res.status(400).redirect("/signin");
  }

  req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.user_name = userData.user_name;
    req.session.logged_in = true;
    res.redirect("/dashboard");
  });
};

const singUp_post = async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id;
      res.status(200).redirect("/");
    });
  } catch (err) {
    res.status(400).redirect("/SignUp");
  }
};

const signOut_get = async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect("/SignIn");
    });
  } else {
    res.status(404).end();
  }
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
  login_post,
  dashBoard_get,
  landing_page,
  getPostById,
  singUp_post,
  signOut_get,
};
