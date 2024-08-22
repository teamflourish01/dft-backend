// controllers/testimonialController.js
const { testimonialModel } = require("./testimonialModel");

// Create a new testimonial
exports.addTestimonail = async (req, res) => {
  try {
    const { Testimonial_description, Testimonial_name } = req.body;
    const testimonialFile = req.file ? req.file.filename : null;

    const Testimonial = new testimonialModel({
      Testimonial_description,
      Testimonial_name,
      Testimonial_image: testimonialFile,
    });
    await Testimonial.save();
    res
      .status(200)
      .json({ msg: "Testimonial added successfully", data:Testimonial });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Couldn't add testimonial",error });
  }
};

// Get all testimonials or a single testimonial by ID
exports.getTestimonail = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      // Fetch single testimonial
      const testimonial = await testimonialModel.findById(id);
      if (!testimonial) {
        return res.status(404).send({ msg: "Testimonial not found" });
      }

      res.status(200).send(testimonial);
    } else {
      // Fetch all testimonials
      const posts = await testimonialModel.find();

      res.status(200).send(posts);
    }
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send({ msg: "Couldn't retrieve testimonials", details: error });
  }
};

// Update a testimonial by ID
exports.updateTestimonail = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const testimonialFile = req.file ? req.file.filename : null;

  try {
    // Check if testimonial exists
    const testimonial = await testimonialModel.findById(id);
    if (!testimonial) {
      return res.status(404).json({ msg: "Testimonial not found" });
    }

    // Update testimonial data
    const updatedData = {
      ...updates,
      Testimonial_image: testimonialFile || testimonial.Testimonial_image,
    };

    const data = await testimonialModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json({ msg: "Testimonial Update Successfuly", data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Couldn't update testimonial", error: error.message });
  }
};

// Delete a testimonial by ID
exports.deleteTestimonail = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await testimonialModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).send({ msg: "Testimonial not found" });
    }
    res.status(200).send({ msg: "Testimonial deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send({ msg: "Couldn't delete testimonial", details: error });
  }
};
