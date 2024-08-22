const express = require("express");
const UserRouter = express.Router();
const multer = require("multer");
const userController = require("../user/userController");
const authMiddleware = require("../../middleware/authMiddaleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/user");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});
UserRouter.get("/user", userController.getUser);
UserRouter.post("/user/add", upload.single("image"), userController.addUser);
UserRouter.get("/user/:id", userController.getUserDetail);
UserRouter.delete("/user/delete/:id", userController.deleteUser);
UserRouter.get("/user/search/:search", userController.searchUser);
UserRouter.post("/user/signin", userController.checkUser);
UserRouter.put(
  "/user/edit/:id",
  upload.single("image"),
  userController.editUser
);
UserRouter.get("/loginuser", authMiddleware, userController.user);

module.exports = UserRouter;
