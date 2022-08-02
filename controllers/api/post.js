const { Post } = require("../../models");

const getAllPosts_get = async (req, res) => {
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
};

const getPostByUser_get = async (req, res) => {
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
};

const createPost_post = async (req, res) => {
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
};

const updatePostById_put = async (req, res) => {
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
};

const deletePost_delete = async (req, res) => {
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
};

module.exports = {
  getAllPosts_get,
  getPostByUser_get,
  createPost_post,
  updatePostById_put,
  deletePost_delete,
};
