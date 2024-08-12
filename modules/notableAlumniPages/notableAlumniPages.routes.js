const express = require("express");
const { addNotablealumnipages, getNotablealumnipages, updateNotablealumnipages, deleteNotablealumnipages } = require("./notableAlumniPagesController");

const router = express.Router();

// Create a new post
router.post("/notablealumnipage/posts", addNotablealumnipages);

// Get all posts
router.get("/notablealumnipage", getNotablealumnipages);
// Get all posts
router.get("/notablealumnipage/:id", getNotablealumnipages);

// Update a specific post by ID
router.put("/notablealumnipage/update/:id", updateNotablealumnipages);

// Delete a specific post by ID
router.delete("/notablealumnipage/delete/:id", deleteNotablealumnipages);

module.exports = router;
