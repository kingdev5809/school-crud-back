const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ msg: "User yoki Parol notog'ri", status: false });
    if (user.password != password) {
      return res.json({ msg: "User yoki Parol notog'ri", status: false });
    }
    return res.json({
      status: true,
      user,
      msg: "Muvaffaqiyatli tizimga kirildi!",
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const usernameCheck = await User.findOne({ name });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.updateOneUser = async (req, res, next) => {
  const { id, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.findOneAndUpdate(
      { _id: id },
      { $set: { name: name, password: hashedPassword } }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "name",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
