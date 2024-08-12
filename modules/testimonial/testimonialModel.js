const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  Testimonial_image: 
    {
      type: String, 
      //   required: true,
    },
  Testimonial_description:{
    type: String,
    // required: true,
  },
  Testimonial_name:{ 
    type:String,
    // required: true, 
  }
  
});

const testimonialModel = mongoose.model("testimonial", testimonialSchema);

module.exports = { testimonialModel };
