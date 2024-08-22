const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  addAbout,
  getAbout,
  updateAbout,
  deleteAbout,
  getAboutDetails,
} = require("./aboutAlumniController");
const SetImgsize = require("../../middleware/imageMiddleware");

const app = express();
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/aboutimage");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const dimensions = {
  About_images: { width: 673, height: 476 },
};

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Create a new post
router.post("/aboutpage/posts", upload.single("About_images"), addAbout);

// Get all posts
router.get("/about", getAbout);
router.get("/about/:id", getAboutDetails);
// Update a specific post by ID
router.put(
  "/aboutpage/update/:id",
  upload.single("About_images"),
  SetImgsize(dimensions),
  updateAbout
);

// Delete a specific post by ID
router.delete("/aboutpage/delete/:id", deleteAbout);

module.exports = router;
