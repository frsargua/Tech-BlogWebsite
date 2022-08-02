const { raw } = require("express");
const { withAuth, withAuthLogged } = require("../utils/auth");
const {
  login_get,
  dashBoard_get,
  landing_page,
  getPostById,
} = require("./appContoller");

const router = require("express").Router();

router.get("/", landing_page);

router.get("/dashBoard", withAuth, dashBoard_get);

router.get("/post/:id", getPostById);

router.get("/SignIn", withAuthLogged, login_get);

router.get("/SignUp", withAuthLogged, async (req, res) => {
  loggedIn = req.session.logged_in;

  res.render("SignUp", { loggedIn });
});

module.exports = router;
