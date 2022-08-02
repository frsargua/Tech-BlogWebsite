const { User } = require("../../models");

const updateUser_put = async (req, res) => {
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
};

module.exports = { updateUser_put };
