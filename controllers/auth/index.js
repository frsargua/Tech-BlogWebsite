const { User } = require("../../models/index");

const login_post = async (req, res) => {
  const { user_name, password } = req.body;

  const userData = await User.findOne({
    where: { user_name: user_name },
  });

  if (!userData) {
    return req.session.save(() => {
      req.session.error = "Incorrect username";
      res.status(400).redirect("/signin");
    });
  }

  const validPassword = await userData.checkPassword(password);

  if (!validPassword) {
    req.session.save(() => {
      req.session.error = "Invalid password";
      return res.status(400).redirect("/signin");
    });
  } else {
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.user_name;
      req.session.logged_in = true;
      res.redirect("/dashboard");
    });
  }
};

const singUp_post = async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id;
      req.session.user_name = userData.user_name;
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

module.exports = {
  login_post,
  singUp_post,
  signOut_get,
};
