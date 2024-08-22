const { notableAlumniPagesModel } = require('./notableAlumniPagesModel');

// Create a new post
exports.addNotablealumnipages = async (req, res) => {
  try {
    const { notableAlumniPages_name, notableAlumniPages_designation, notableAlumniPages_text } = req.body;

    const notableAlumniPages = new notableAlumniPagesModel({
      notableAlumniPages_name,
      notableAlumniPages_designation,
      notableAlumniPages_text,
    });
    await notableAlumniPages.save();
    res.status(200).json({ msg: "Notable Alumni Page added successfully", notableAlumniPages });
  } catch (error) {
    res.status(400).json({ error: "Couldn't add notable alumni page", error });
  }
};


// Get all Notablealumnipages or a single Notablealumnipages by ID
exports.getNotablealumnipages = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const Notablealumnipages = await notableAlumniPagesModel.findById(id);
      if (!Notablealumnipages) {
        return res.status(404).send({ msg: "notable alumni pages not found" });
      }
      
      res.status(200).send(Notablealumnipages);
    } else {
      const posts = await notableAlumniPagesModel.find();
      
      res.status(200).send(posts);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't Retrieve notable alumni pages", details: error });
  }
};
exports.updateNotablealumnipages = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const Notablealumnipages = await notableAlumniPagesModel.findById(id);
    if (!Notablealumnipages) {
      return res.status(404).send({ msg: 'notable alumni page not found' });
    }
    const updateNotablealumnipages = await notableAlumniPagesModel.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).send(updateNotablealumnipages);
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't Update notable alumni page", error });
  }
};

// Delete a post by ID
exports.deleteNotablealumnipages = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await notableAlumniPagesModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).send({ msg: 'Post not found' });
    }
    res.status(200).send({ msg: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).send({
      msg: "Couldn't delete notable alumni page",
      error,
    });
  }
};
