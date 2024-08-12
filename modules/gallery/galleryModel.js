const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  Gallery_images: {
    type: Array,
    required: true,
  }
});

const galleryModel = mongoose.model("gallery", gallerySchema);

module.exports = { galleryModel };
 