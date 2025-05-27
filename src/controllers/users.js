const User = require("../models/User");

exports.updatePermissions = async (req, res) => {
  const { permissions } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { permissions },
    { new: true }
  );
  res.json(user);
};
