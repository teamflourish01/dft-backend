const express = require("express");
const multer = require("multer");
const path = require("path");
const { addTestimonail, getTestimonail, updateTestimonail, deleteTestimonail } = require("./testimonialController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/testimonialimage");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  // fileFilter: (req, file, cb) => {
  //   const filetypes = /jpeg|jpg|png/;
  //   const mimetype = filetypes.test(file.mimetype);
  //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
  //   if (mimetype && extname) {
  //     return cb(null, true);
  //   }
  //   cb("Error: File upload only supports the following filetypes - " + filetypes);
  // }
});

// Create a new post
router.post("/testimonial/posts", upload.single("Testimonial_image"), addTestimonail);

// Get all posts
router.get("/testimonial", getTestimonail);

// Get a single post by ID
router.get("/testimonial/:id", getTestimonail);

// Update a specific post by ID
router.put("/testimonial/update/:id", upload.single("Testimonial_image"), updateTestimonail);

// Delete a specific post by ID
router.delete("/testimonial/delete/:id", deleteTestimonail);

module.exports = router;
