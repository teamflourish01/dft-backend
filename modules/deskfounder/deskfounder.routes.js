const express = require("express");
const multer = require("multer");
const path = require("path");
const { addDeskfounder, getDeskfounder, updateDeskfounder, deleteDeskfounder } = require("./deskfounderController");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/deskfounder");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({
    storage: storage, 
  }); 
 
// Create a new post
router.post("/deskfounder/posts",upload.single("Deskfounder_images"), addDeskfounder);

// Get all posts
router.get("/deskfounder", getDeskfounder);

// Get a single post by ID
router.get("/deskfounder/:id", getDeskfounder);

// Update a specific post by ID
router.put("/deskfounder/update/:id", upload.single("Deskfounder_images"), updateDeskfounder);


// Delete a specific post by ID
router.delete("/deskfounder/delete/:id", deleteDeskfounder); // Use DELETE and include :id for deleting

module.exports = router;
