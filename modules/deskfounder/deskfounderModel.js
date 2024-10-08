const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};
const deskfounderSchema = new mongoose.Schema(
  {
    Deskfounder_images: {
      type: String,
    },
    author_name: {
      type: String,
      // required: true,
    },

    description: {
      type: String,
    },
  },
  options
);

const deskfounderModel = mongoose.model("deskfounder", deskfounderSchema);

module.exports = { deskfounderModel };
