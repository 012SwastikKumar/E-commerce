const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  getUserDetailsAdmin,
  getAllUsers,
  updateUserAdmin,
  deleteUserAdmin,
} = require("../controllers/userController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
// router.route('/password/forgot').post(forgotPassword);
// router.route('/password/reset/:token').put(resetPassword);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/me/update").put(isAuthenticated, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getUserDetailsAdmin)
  .put(isAuthenticated, authorizeRoles("admin"), updateUserAdmin)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUserAdmin);

module.exports = router;
