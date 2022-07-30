const { User, Post } = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const allPost = await Post.findAll({
    raw: true,
  });
  console.log(allPost);
  res.render("all", { allPost });
});

router.get("/dashBoard", async (req, res) => {
  res.render("dashBoard");
});
router.get("/post/:id", async (req, res) => {
  const singlePost = await Post.findByPk(req.params.id, {
    raw: true,
  });
  console.log(singlePost);
  res.render("singlePost", { singlePost });
});
router.get("/SignIn", async (req, res) => {
  res.render("SignIn");
});

router.get("/SignUp", async (req, res) => {
  res.render("SignUp");
});

module.exports = router;
