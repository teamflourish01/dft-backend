const { notableAlumniModel } = require('./notableAlumniModel');

// Create a new post
exports.addAlumni = async (req, res) => {
  try {
    const { Notable_name, Notable_designation } = req.body;
    const notablealumniFile = req.file ? req.file.filename : null;

    const Notablealumni = new notableAlumniModel({
      Notable_name,
      Notable_designation,
      Notable_images: notablealumniFile,
    });
    await Notablealumni.save();
    res.status(200).json({ msg: "notableAlumni added successfully", Notablealumni });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Couldn't Add notableAlumni", error });
  }
};

// Get all notablealumni or a single notablealumni by ID
exports.getAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const notableAlumni = await notableAlumniModel.findById(id);
      if (!notableAlumni) {
        return res.status(404).send({ msg: "notableAlumni not found" });
      }
      console.log('fetch NotableAlumni:', notableAlumni);
      res.status(200).send(notableAlumni);
    } else {
      const posts = await notableAlumniModel.find();
      console.log('fetched NotableAlumni:', posts);
      res.status(200).send(posts);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't Retrieve notableAlumni", details: error });
  }
};

// Update a notablealumni by ID
exports.updateAlumni = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const notableAlumniFile = req.file ? req.file.filename : null;

  try {
    const notableAlumni = await notableAlumniModel.findById(id);
    if (!notableAlumni) {
      return res.status(404).send({ msg: 'notablealumni not found' });
    }

    const updateData = {
      ...updates,
      Notable_images: notableAlumniFile || notableAlumni.Notable_images,
    };
    const updateNotableAlumni = await notableAlumniModel.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).send(updateNotableAlumni);
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't Update notableAlumni", error });
  }
};

// Delete a post by ID
exports.deleteAlumni = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await notableAlumniModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).send({ msg: 'Post not found' });
    }
    res.status(200).send({ msg: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't Delete notableAlumni", details: error });
  }
};
