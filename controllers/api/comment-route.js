const router = require("express").Router();
const { Comment } = require("../../models");

//Get all posts
router.get("/", async (req, res) => {
  try {
    const getAllComments = await Comment.findAll();
    if (!getAllComments) {
      res.status(404).json({ message: "Location not present in the database" });
      return;
    }
    res.status(200).json(getAllComments);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Create new posts
router.post("/:id", async (req, res) => {
  console.log(req.body);
  try {
    const newComment = await Comment.create({
      comment_post_id: req.params.id,
      comment_owner: req.body.user_id,
      comment_text: req.body.description,
    });
    res.status(200).json(newComment);
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
    const deleteBooking = await Comment.destroy({
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
