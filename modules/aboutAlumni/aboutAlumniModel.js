const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
    About_images: 
    {
      type: String, 
      //   required: true,
    },
  About_heading: {
    type: String,
    required: true,
  },
  About_text: {
    type: String,
    required: true,
  }, 
  Our_mision_heading:{
    type: String,
    required: true,
  },
  Our_mision_text:{
    type: String,
    required: true,
  },
  Our_vision_heading:{
    type: String,
    required: true,
  },
  Our_vision_text:{
    type: String,
    required: true,
  },
 
});

const aboutAlumniModel = mongoose.model("About", aboutSchema);

module.exports = { aboutAlumniModel };
