const router = require("express").Router();
const { Post } = require("../../models");

//Get all posts
router.get("/", async (req, res) => {
  try {
    const allPostData = await Post.findAll();
    if (!allPostData) {
      res.status(404).json({ message: "Location not present in the database" });
      return;
    }
    res.status(200).json(allPostData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get posts by user
router.get("/user", async (req, res) => {
  try {
    const allPostData = await Post.findAll({
      where: {
        post_owner: req.session.user_id,
      },
    });
    if (!allPostData) {
      res.status(404).json({ message: "Location not present in the database" });
      return;
    }
    res.status(200).json(allPostData);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Create new posts
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newPost = await Post.create({
      post_owner: req.session.user_id,
      post_title: req.body.post_title,
      post_text: req.body.description,
    });
    // res.status(200).json(newPost);
    res.redirect("/dashboard");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/update/:id", async (req, res) => {
  console.log(req.body);
  try {
    const newPost = await Post.update(
      {
        post_title: req.body.post_title,
        post_text: req.body.post_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(newPost);
    // res.redirect("/dashboard");
  } catch (error) {
    res.status(400).json(error);
  }
});

// router.put('/:id', (req, res) => {
//   // update a User's description by its `id` value
// });

router.delete("/:id", async (req, res) => {
  // delete a Userby its `id` value
  try {
    const deleteBooking = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteBooking) {
      res.status(404).json({ message: "No booking found with this id!" });
      return;
    }
    res.status(200).json(deleteBooking);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
