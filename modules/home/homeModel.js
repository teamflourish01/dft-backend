const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const homeSchema = new mongoose.Schema(
  {
    banner_heading: {
      type: String,
      required: true,
    },
    banner_subTitle: {
      type: String,
      required: true,
    },
    banner_text: {
      type: String,
      required: true,
    },
    Banner_images: {
      type: Array,
      // required: true,
    },
    event_heading: {
      type: Array,
      required: true,
    },
    event_date: [
      {
        type: String,
        required: true,
      },
    ],
    event_text: {
      type: Array,
      required: true,
    },
  },
  options
);

const HomeModel = mongoose.model("Home", homeSchema);

module.exports = { HomeModel };
