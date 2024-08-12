const express = require("express");
const multer = require("multer");
const path = require("path");
const { addGallery, getGallery, updateGallery, deleteGallery } = require("./galleryController");

const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/gallery");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
}); 

const upload = multer({
  storage: storage,
});

// Create a new post with file upload
router.post("/gallery/posts", upload.array("Gallery_images"), addGallery);

// Get all posts
router.get("/gallery", getGallery);

// Get a single post by ID
router.get("/gallery/:id", getGallery);

// Update a specific post by ID
router.put("/gallery/update/:id", upload.array("Gallery_images"), updateGallery);


// Delete a specific post by ID
router.delete("/gallery/delete/:id", deleteGallery);

module.exports = router;

