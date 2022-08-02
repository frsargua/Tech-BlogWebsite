const router = require("express").Router();

const apiRoutes = require("./api/index");
const homeRoutes = require("./homeRoutes");
const authRoutes = require("./auth/index");

router.use("/", homeRoutes);
router.use("/auth", authRoutes);
router.use("/api", apiRoutes);

module.exports = router;
