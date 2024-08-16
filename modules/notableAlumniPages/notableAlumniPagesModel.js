const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const notableAlumniPagesSchema = new mongoose.Schema(
  {
    notableAlumniPages_name: {
      type: String,
      // required: true,
    },
    notableAlumniPages_designation: {
      type: String,
      // required: true,
    },
    notableAlumniPages_text: {
      type: String,
      // required: true,
    },
  },
  options
);

const notableAlumniPagesModel = mongoose.model(
  "notableAlumniPages",
  notableAlumniPagesSchema
);

module.exports = { notableAlumniPagesModel };
