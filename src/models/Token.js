const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  refreshToken: String,
});

module.exports = mongoose.model("Token", tokenSchema);
