const { User, Post } = require("../models");

const router = require("express").Router();

let loggedIn;

router.get("/", async (req, res) => {
  const allPost = await Post.findAll({
    raw: true,
  });
  loggedIn = req.session.logged_in;
  console.log(loggedIn);
  res.render("all", { allPost, loggedIn });
});

router.get("/dashBoard", async (req, res) => {
  let userPosts = await Post.findAll({
    raw: true,
    where: {
      post_owner: req.session.user_id,
    },
  });
  console.log(userPosts);
  loggedIn = req.session.logged_in;

  res.render("dashBoard", { userPosts, loggedIn });
});

router.get("/post/:id", async (req, res) => {
  const singlePost = await Post.findByPk(req.params.id, {
    raw: true,
  });
  console.log(singlePost);
  loggedIn = req.session.logged_in;

  res.render("singlePost", { singlePost, loggedIn });
});

router.get("/SignIn", async (req, res) => {
  loggedIn = req.session.logged_in;

  res.render("SignIn", { loggedIn });
});

router.get("/SignUp", async (req, res) => {
  loggedIn = req.session.logged_in;

  res.render("SignUp", { loggedIn });
});

module.exports = router;
