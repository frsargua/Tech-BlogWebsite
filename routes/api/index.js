const router = require("express").Router();
const userRoutes = require("./user-route");
const postRoutes = require("./post-route");
const commentRoute = require("./comment-route");

router.use("/users", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoute);

module.exports = router;
