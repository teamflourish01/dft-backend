const {deskfounderModel } = require('./deskfounderModel');

// Create a new post

exports.addDeskfounder = async (req, res) => {
  try {
    const {author_name,description,filename } = req.body;
    // const deskfounderFile = req.file.filename;
    const deskfounderFile = req.file ? req.file.filename : null;


    const Deskfounder = new deskfounderModel({
      author_name,
      description, 
        Deskfounder_images: deskfounderFile,
    }); 
    await Deskfounder.save();
    res.status(200).json({ msg: "deskfounderF add successfuly", Deskfounder });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Couldn't Add deskfounder", error });
  }
};


// Get all deskfounder or a single deskfounder by ID

exports.getDeskfounder = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const Deskfounder = await deskfounderModel.findById(id);
      if (!Deskfounder) {
        return res.status(404).send({ msg: "deskfounder not found" });
      }
      console.log('fetch deskfounder:', Deskfounder);
      res.status(200).send(Deskfounder);
    } else {
      const posts = await deskfounderModel.find();
      console.log('fetched deskfounder:', posts);
      res.status(200).send(posts);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't Retrieve deskfounder", details: error });
  }
};


// Update a post by ID
exports.updateDeskfounder = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const deskfounderFile = req.file ? req.file.filename : null;

  try {
    const Deskfounder = await deskfounderModel.findById(id);
    if (!Deskfounder) {
      return res.status(404).send({ msg: 'Deskfounder not found' });
    }

    const updateData = {
      ...updates,
      Deskfounder_images: deskfounderFile || Deskfounder.Deskfounder_images,
    };
    const updateDeskfounder = await deskfounderModel.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).send(updateDeskfounder);
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't Update Deskfounder", error });
  }
};

// Delete a post by ID
exports.deleteDeskfounder = async (req, res) => {  
  const { id } = req.params;

  try {
    const deletedPost = await deskfounderModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).send({ msg: 'Post not found' });
    }
    res.status(200).send({ msg: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).send({
      msg: "Couldn't Delete deskfounder",
      error,
    });
  }
};
