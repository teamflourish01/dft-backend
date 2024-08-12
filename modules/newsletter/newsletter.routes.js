const express = require("express");
const multer = require("multer");
const path = require("path");
const { addNewsletter, getNewsletter, updateNewsletter, deleteNewsletter } = require("./newsletterController");

const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/newsletter");
    }, 
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({
    storage: storage,
  });
  

// Create a new post with file upload
router.post("/newsletter/posts", upload.single("Newsletter_pdfs"), addNewsletter);

// Get all posts
router.get("/newsletter", getNewsletter);

// Get a single post by ID
router.get("/newsletter/:id", getNewsletter);

// Update a specific post by ID
router.put("/newsletter/update/:id", upload.single("Newsletter_pdfs"), updateNewsletter);


// Delete a specific post by ID
router.delete("/newsletter/delete/:id", deleteNewsletter);

module.exports = router;
