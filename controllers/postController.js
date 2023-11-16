const Post = require("../models/postModel");

module.exports.createPosts = async (req, res, next) => {
  try {
    const { number, userName } = req.body;

    const post = await Post.create({
      number,
      userName,
    });
    return res.json(post);
  } catch (err) {
    next(err);
  }
};

module.exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ _id: { $ne: req.params.id } }).select([
      "number",
      "userName",
    ]);
    return res.json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports.editPost = async (req, res, next) => {
  try {
    const { id, number, userName } = req.body;
    await Post.findOneAndUpdate(
      { _id: id },
      { $set: { userName: userName, number: number } }
    );
  } catch (error) {}
};
module.exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = Post.findById(id);
    if (!post) {
      return res.json({ msg: "Post topilmadi", status: false });
    }
    await Post.findByIdAndDelete(id);
    res.json({ msg: "Muvaffaqiyatli o'chirildi", status: true });
  } catch (error) {}
};
