// controllers/testimonialController.js
const { testimonialModel } = require('./testimonialModel');

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
    res.status(200).json({ msg: "Testimonial added successfully", Testimonial });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Couldn't add testimonial", details: error });
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
        return res.status(404).send({ msg: 'Testimonial not found' });
      }
      console.log('Fetched Testimonial:', testimonial); // Log the testimonial data
      res.status(200).send(testimonial);
    } else {
      // Fetch all testimonials
      const posts = await testimonialModel.find();
      console.log('Fetched Testimonials:', posts); // Log all testimonials data
      res.status(200).send(posts);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't retrieve testimonials", details: error });
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
      return res.status(404).send({ msg: 'Testimonial not found' });
    }

    // Update testimonial data
    const updatedData = {
      ...updates,
      Testimonial_image: testimonialFile || testimonial.Testimonial_image,
    };

    const updatedTestimonial = await testimonialModel.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).send(updatedTestimonial);
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't update testimonial", details: error });
  }
};

// Delete a testimonial by ID
exports.deleteTestimonail = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await testimonialModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).send({ msg: 'Testimonial not found' });
    }
    res.status(200).send({ msg: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't delete testimonial", details: error });
  }
};
