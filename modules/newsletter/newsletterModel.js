const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
}; 

const newsletterSchema = new mongoose.Schema({
  Newsletter_pdfs: {
    type: String,
    required: true,
  },
  Newsletter_name: {
    type: String,
    required: true,
  },
},
options
);

const newsletterModel = mongoose.model("newsletter", newsletterSchema);

module.exports = { newsletterModel };
 