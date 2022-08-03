const router = require("express").Router();
const { Comment } = require("../../models");
const {
  getAllComments_get,
  createComment_post,
  deleteComment_delete,
  updateComment_put,
} = require("../../controllers/api/comment");

router.get("/", getAllComments_get);

router.post("/:id", createComment_post);

router.delete("/:id", deleteComment_delete);

router.post("/update/:id/:location", updateComment_put);

module.exports = router;
