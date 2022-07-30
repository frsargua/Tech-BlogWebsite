const router = require("express").Router();
const { User } = require("../../models");

router.post("/signUp", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id;
      res.status(200).redirect("/");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { user_name: req.body.user_name },
    });

    if (!userData) {
      res.status(400).json({ message: "Incorrect username" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email orr password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).redirect("/");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/signOut", async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// //Optional

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
