const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, permissions: user.permissions },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
  return { accessToken, refreshToken };
};

exports.signup = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  const tokens = generateTokens(user);
  await new Token({
    userId: user._id,
    refreshToken: tokens.refreshToken,
  }).save();
  res.status(201).json(tokens);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ error: "Invalid credentials" });
  const tokens = generateTokens(user);
  await new Token({
    userId: user._id,
    refreshToken: tokens.refreshToken,
  }).save();
  res.json(tokens);
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  const found = await Token.findOne({ refreshToken });
  if (!found) return res.status(403).json({ error: "Invalid refresh token" });
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.id);
  const tokens = generateTokens(user);
  await Token.create({ userId: user._id, refreshToken: tokens.refreshToken });
  res.json(tokens);
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  await Token.deleteOne({ refreshToken });
  res.sendStatus(204);
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });
  // Mock token flow
  const resetToken = jwt.sign({ id: user._id }, "mockResetSecret", {
    expiresIn: "15m",
  });
  res.json({ message: "Mock reset link generated", resetToken });
};
