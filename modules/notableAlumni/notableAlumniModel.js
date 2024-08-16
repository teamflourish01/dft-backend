const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const notableAlumniSchema = new mongoose.Schema(
  {
    Notable_images: {
      type: String, // Assuming you'll store image URLs or paths
      //   required: true,
    },

    Notable_name: {
      type: String,
      required: true,
    },
    Notable_designation: {
      type: String,
      required: true,
    },
  },
  options
);

const notableAlumniModel = mongoose.model("notableAlumni", notableAlumniSchema);

module.exports = { notableAlumniModel };
