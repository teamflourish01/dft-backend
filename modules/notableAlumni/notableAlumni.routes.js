const express = require("express");
const multer = require("multer");
const path = require("path");
const { addAlumni, getAlumni, updateAlumni, deleteAlumni } = require("./notableAlumniController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/notablealumni");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

// Create a new post
router.post("/notablealumni/posts", upload.single("Notable_images"), addAlumni);

// Get all posts
router.get("/notablealumni", getAlumni);

// Get a single post by ID
router.get("/notablealumni/:id", getAlumni);

// Update a specific post by ID
router.put("/notablealumni/update/:id", upload.single("Notable_images"), updateAlumni);

// Delete a specific post by ID
router.delete("/notablealumni/delete/:id", deleteAlumni);

module.exports = router;
