const mongoose = require("mongoose");

const notableAlumniSchema = new mongoose.Schema({
  Notable_images: 
    {
      type: String, // Assuming you'll store image URLs or paths
      //   required: true,
    },
 
  Notable_name:{
    type: String,
    required: true,
  },
  Notable_designation:{ 
    type:String,
    required: true,
  }
  
});

const notableAlumniModel = mongoose.model("notableAlumni", notableAlumniSchema);

module.exports = { notableAlumniModel };
