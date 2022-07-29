const { User, Post } = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("all");
});

router.get("/dashBoard", async (req, res) => {
  res.render("dashBoard");
});
router.get("/SignIn", async (req, res) => {
  res.render("SignIn");
});

router.get("/Sign Up", async (req, res) => {
  res.render("SignUp");
});

module.exports = router;
