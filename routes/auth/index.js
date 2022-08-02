const router = require("express").Router();
const {
  login_post,
  singUp_post,
  signOut_get,
} = require("../../controllers/auth/index");

router.post("/signUp", singUp_post);

router.post("/signIn", login_post);

router.get("/signOut", signOut_get);

module.exports = router;
