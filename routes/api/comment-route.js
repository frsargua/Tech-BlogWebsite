const router = require("express").Router();
const { Comment } = require("../../models");
const {
  getAllComments_get,
  createComment_post,
  deleteComment_delete,
} = require("../../controllers/api/comment");

router.get("/", getAllComments_get);

router.post("/:id", createComment_post);

router.delete("/:id", deleteComment_delete);

module.exports = router;
