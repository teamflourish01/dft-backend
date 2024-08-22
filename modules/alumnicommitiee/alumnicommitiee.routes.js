const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  addAlumnicommitiee,
  getAlumnicommitiee,
  updateAlumnicommitiee,
  deleteAlumnicommitiee,
} = require("./alumnicommitieeController");
const SetImgsize = require("../../middleware/imageMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/alumnicommitiee");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

const dimensions = {
  Commitiee_images: { width: 127, height: 127 },
};

// Create a new post
router.post(
  "/alumnicommitiee/posts",
  upload.single("Commitiee_images"),
  SetImgsize(dimensions),
  addAlumnicommitiee
);

// Get all posts
router.get("/alumnicommitiee", getAlumnicommitiee);

// Get a single post by ID
router.get("/alumnicommitiee/:id", getAlumnicommitiee);

// Update a specific post by ID
router.put(
  "/alumnicommitiee/update/:id",
  upload.single("Commitiee_images"),
  SetImgsize(dimensions),
  updateAlumnicommitiee
);

// Delete a specific post by ID
router.delete("/alumnicommitiee/delete/:id", deleteAlumnicommitiee); // Use DELETE and include :id for deleting

module.exports = router;
