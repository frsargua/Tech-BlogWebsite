const router = require("express").Router();
const { Post } = require("../../models");
const {
  getAllPosts_get,
  getPostByUser_get,
  createPost_post,
  updatePostById_put,
  deletePost_delete,
} = require("../../controllers/api/post");

router.get("/", getAllPosts_get);

router.get("/user", getPostByUser_get);

router.post("/", createPost_post);

router.put("/update/:id", updatePostById_put);

router.delete("/:id", deletePost_delete);

module.exports = router;
