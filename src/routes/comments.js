const express = require("express");
const router = express.Router();
const {
  getComments,
  addComment,
  deleteComment,
} = require("../controllers/comments");
const { authenticate } = require("../middlewares/auth");
const { authorize } = require("../middlewares/permissions");

router.get("/", authenticate, authorize("read"), getComments);
router.post("/", authenticate, authorize("write"), addComment);
router.delete("/:id", authenticate, authorize("delete"), deleteComment);

module.exports = router;
