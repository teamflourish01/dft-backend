const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const gallerySchema = new mongoose.Schema(
  {
    Gallery_images: {
      type: Array,
      required: true,
    },
  },
  options
);

const galleryModel = mongoose.model("gallery", gallerySchema);

module.exports = { galleryModel };
