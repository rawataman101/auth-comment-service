const Comment = require("../models/Comment");

exports.getComments = async (req, res) => {
  const comments = await Comment.find().populate("userId", "name");
  if (!comments) {
    return res.status(404).json({ error: "No comments found" });
  }
  res.json(comments);
};

exports.addComment = async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string" || text.trim() === "") {
    return res.status(400).json({
      error: "Comment text is requried and must be a non-empty string",
    });
  }
  try {
    const comment = new Comment({ userId: req.user.id, text: text.trim() });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

exports.deleteComment = async (req, res) => {
  const deleted = await Comment.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: "No comment found with that ID" });
  }
  res.json({ message: "Comment deleted successfully" });
};
