const {
  login,
  register,
  getAllUsers,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
// router.post("/register", register);
// router.get("/allusers", getAllUsers);
module.exports = router;
