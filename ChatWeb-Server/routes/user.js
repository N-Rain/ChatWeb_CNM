const router = require("express").Router();

const userController = require("../controllers/user");
const authController = require("../controllers/auth");

// router.patch("/update-me", authController.protect, userController.updateMe);
// router.get("/get-all-verified-users", authController.protect, userController.getAllVerifiedUsers);
// router.get("/get-users", authController.protect, userController.getUsers);
router.get("/get-users", authController.protect, userController.getUsers);
router.get("/get-requests", authController.protect, userController.getRequests);
router.get("/get-friends", authController.protect, userController.getFriends);
router.patch(
  "/update-me",
  authController.protect,
  // upload.single("avatar"), // "avatar" là tên trường trong form để tải lên
  userController.updateMe
);
module.exports = router;