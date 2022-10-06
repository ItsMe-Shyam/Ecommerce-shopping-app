const {
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  changePassword,
  updateProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getSingleUser,
} = require("../controllers/userController");
const express = require("express");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(createUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticated, getUserDetails);

router.route("/me/update").put(isAuthenticated, updateProfile);

router.route("/password/update").put(isAuthenticated, changePassword);

router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRole("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRole("admin"), getSingleUser)
  .put(isAuthenticated, authorizeRole("admin"), updateUserRole)
  .delete(isAuthenticated, authorizeRole("admin"), deleteUser);

module.exports = router;
