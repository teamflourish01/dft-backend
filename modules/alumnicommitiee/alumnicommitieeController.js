const { alumnicommitieeModel } = require('./alumnicommitieeModel');

// Create a new post
exports.addAlumnicommitiee = async (req, res) => {
  try {
    const { Commitiee_name, Commitiee_designation } = req.body;
    const CommitieealumniFile = req.file ? req.file.filename : null;

    const Commitieealumni = new alumnicommitieeModel({
      Commitiee_name,
      Commitiee_designation,
      Commitiee_images: CommitieealumniFile,
    });
    await Commitieealumni.save();
    res.status(200).json({ msg: "Commitieealumni added successfully", Commitieealumni });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Couldn't Add Commitieealumni", error });
  }
};

// Get all Commitieealumni or a single Commitieealumni by ID
exports.getAlumnicommitiee = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const Commitieealumni = await alumnicommitieeModel.findById(id);
      if (!Commitieealumni) {
        return res.status(404).send({ msg: "Commitieealumni not found" });
      }
      
      res.status(200).send(Commitieealumni);
    } else {
      const posts = await alumnicommitieeModel.find();
      
      res.status(200).send(posts);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't Retrieve Commitieealumni", details: error });
  }
};

// Update a Commitieealumni by ID
exports.updateAlumnicommitiee = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const CommitieealumniFile = req.file ? req.file.filename : null;

  try {
    const Commitieealumni = await alumnicommitieeModel.findById(id);
    if (!Commitieealumni) {
      return res.status(404).send({ msg: 'Commitieealumni not found' });
    }

    const updateData = {
      ...updates,
      Commitiee_images: CommitieealumniFile || Commitieealumni.Commitiee_images,
    };
    const updateAlumnicommitiee = await alumnicommitieeModel.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).send({msg:"Update Alumnicommitiee successfuly",data:updateAlumnicommitiee});
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't Update Alumnicommitiee", error });
  }
};

// Delete a post by ID
exports.deleteAlumnicommitiee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await alumnicommitieeModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).send({ msg: 'Post not found' });
    }
    res.status(200).send({ msg: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't Delete Commitieealumni", details: error });
  }
};
