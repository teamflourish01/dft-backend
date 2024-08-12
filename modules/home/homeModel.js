const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
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
  Banner_images: 
    {
      type: Array, 
        // required: true,
    },
  event_heading: {
    type: Array,
    required: true,
  },
  event_date:[ {
    type: Date,
    required: true,
  }],
  event_text: {
    type: Array,
    required: true,
  },
});

const HomeModel = mongoose.model("Home", homeSchema);

module.exports = { HomeModel };
