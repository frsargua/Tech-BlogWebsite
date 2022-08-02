const router = require("express").Router();
const { User } = require("../../models");
const logger = require("../../utils/logger");
const { login_post, singUp_post, signOut_get } = require("../appContoller");

router.post("/signUp", singUp_post);

router.post("/signIn", login_post);

router.get("/signOut", signOut_get);

router.put("/", async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.session.user_id,
      },
    });

    if (!userData) {
      res.status(400).json({ message: "Wrong field" });
      return;
    }
    res.send(userData);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
