const router = require("express").Router();
const { updateUser_put } = require("../../controllers/api/user");

router.put("/", updateUser_put);

module.exports = router;
