const router = require("express").Router();
const {
  createPosts,
  getAllPosts,
  editPost,
  deletePost,
} = require("../controllers/postController");
router.post("/add", createPosts);
router.get("/all", getAllPosts);
router.post("/edit", editPost);
router.post("/delete/:id", deletePost);
module.exports = router;
