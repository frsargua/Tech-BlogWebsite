const { raw } = require("express");
const { withAuth, withAuthLogged } = require("../utils/auth");
const {
  login_get,
  dashBoard_get,
  landingPage_get,
  getPostById,
  sigUps_get,
} = require("../controllers/views/appContoller");

const router = require("express").Router();

// Home routes

router.get("/", landingPage_get);

router.get("/SignIn", withAuthLogged, login_get);

router.get("/SignUp", withAuthLogged, sigUps_get);

router.get("/dashBoard", withAuth, dashBoard_get);

router.get("/post/:id", getPostById);

module.exports = router;
