const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  addHome,
  getHome,
  updateHome,
  deleteHome,
  getHomeDetails,
} = require("./homeController");
const SetImgsize = require("../../middleware/imageMiddleware");

const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/homebannerimage");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Image Size Validation
const dimensions = {
  Banner_images: { width: 907, height: 555 },
};

// Create a new post
router.post("/homepage/posts", upload.array("Banner_images"), addHome);

// Get all posts
router.get("/home", getHome);
router.get("/home/:id", getHomeDetails);
// Update a specific post by ID
router.put(
  "/homepage/update/:id",
  upload.array("Banner_images"),
  SetImgsize(dimensions),
  updateHome
); // Use PUT for updates

// Delete a specific post by ID
router.delete("/homepage/delete/:id", deleteHome); // Use DELETE and include :id for deleting

module.exports = router;
