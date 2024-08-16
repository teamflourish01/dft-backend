const mongoose = require("mongoose");

const deskfounderSchema = new mongoose.Schema({
  Deskfounder_images: {
    type: String, // Assuming you'll store image URLs or paths
    //   required: true,
  },
  author_name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },
});

const deskfounderModel = mongoose.model("deskfounder", deskfounderSchema);

module.exports = { deskfounderModel };
