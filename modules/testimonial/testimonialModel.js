const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const testimonialSchema = new mongoose.Schema(
  {
    Testimonial_image: {
      type: String,
      //   required: true,
    },
    Testimonial_description: {
      type: String,
      // required: true,
    },
    Testimonial_name: {
      type: String,
      // required: true,
    },
  },
  options
);

const testimonialModel = mongoose.model("testimonial", testimonialSchema);

module.exports = { testimonialModel };
