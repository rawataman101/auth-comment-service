const express = require("express");
const router = express.Router();
const { updatePermissions } = require("../controllers/users");
const { authenticate } = require("../middlewares/auth");

router.put("/:id/permissions", authenticate, updatePermissions);

module.exports = router;
