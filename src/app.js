const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const commentRoutes = require("./routes/comments");
const userRoutes = require("./routes/users");
const { handleErrors } = require("./middlewares/error");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

app.use(handleErrors);

module.exports = app;
