const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};
const alumnicommitieeSchema = new mongoose.Schema(
  {
    Commitiee_images: {
      type: String, // Assuming you'll store image URLs or paths
      //   required: true,
    },

    Commitiee_name: {
      type: String,
      required: true,
    },
    Commitiee_designation: {
      type: String,
      required: true,
    },
  },
  options
);

const alumnicommitieeModel = mongoose.model(
  "alumnicommitiee",
  alumnicommitieeSchema
);

module.exports = { alumnicommitieeModel };
