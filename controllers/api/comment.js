const { Comment } = require("../../models");

const getAllComments_get = async (req, res) => {
  try {
    const getAllComments = await Comment.findAll();
    if (!getAllComments) {
      return res
        .status(404)
        .json({ message: "Location not present in the database" });
    }
    res.status(200).json(getAllComments);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createComment_post = async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_post_id: req.params.id,
      comment_owner: req.session.user_name,
      comment_text: req.body.comment_text,
    });
    res.status(200).json(newComment);
    // res.status(200).redirect(`/post/${req.params.id}`);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteComment_delete = async (req, res) => {
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
};

module.exports = {
  getAllComments_get,
  createComment_post,
  deleteComment_delete,
};
