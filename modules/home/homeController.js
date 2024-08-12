const { HomeModel } = require('./homeModel');


// Create a new post
exports.addHome = async (req, res) => {
  try {
    const { banner_heading, banner_subTitle, banner_text, event_heading, event_date, event_text } = req.body;

    // Handle multiple files upload
    const homeFiles = req.files.map(file => file.filename);

    const home = new HomeModel({
      banner_heading,
      banner_subTitle,
      banner_text,
      event_heading: JSON.parse(event_heading), // Parse JSON strings
      event_date: JSON.parse(event_date),       // Parse JSON strings
      event_text: JSON.parse(event_text),       // Parse JSON strings
      Banner_images: homeFiles,
    });

    await home.save();
    res.status(200).json({ msg: "Home added successfully", home });
  } catch (error) {
    res.status(400).json({ error: "Couldn't Add Home", error });
  }
};


// Get all posts
exports.getHome = async (req, res) => {
  try {
    const posts = await HomeModel.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({
      msg: "Couldn't Retrieve Homes",
      error,
    });
  }
};

// Update a post by ID
exports.updateHome = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (req.files && req.files.length > 0) {
    updates.Banner_images = req.files.map(file => file.filename);
  }

  try {
    const updatedPost = await HomeModel.findByIdAndUpdate(id, {
      ...updates,
      event_heading: JSON.parse(updates.event_heading), // Parse JSON strings
      event_date: JSON.parse(updates.event_date),       // Parse JSON strings
      event_text: JSON.parse(updates.event_text),       // Parse JSON strings
    }, { new: true });

    if (!updatedPost) {
      return res.status(404).send({ msg: 'Post not found' });
    }
    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).send({
      msg: "Couldn't Update Home",
      error,
    });
  }
};

// Delete a post by ID
exports.deleteHome = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await HomeModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).send({ msg: 'Post not found' });
    }
    res.status(200).send({ msg: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).send({
      msg: "Couldn't Delete Home",
      error,
    });
  }
};
