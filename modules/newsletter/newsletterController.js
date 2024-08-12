const { newsletterModel } = require('./newsletterModel');

// Create a new post
exports.addNewsletter = async (req, res) => {
  try {
    const { Newsletter_name } = req.body;
    const NewsletterFile = req.file ? req.file.filename : null;

    const Newsletter = new newsletterModel({
      Newsletter_name,
      Newsletter_pdfs: NewsletterFile,
    });
    await Newsletter.save();
    res.status(200).json({ msg: "newsletter added successfully", Newsletter });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Couldn't Add newsletter", error });
  }
};

// Get all newsletter or a single newsletter by ID
exports.getNewsletter = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const Newsletter = await newsletterModel.findById(id);
      if (!Newsletter) {
        return res.status(404).send({ msg: "newsletter not found" });
      }
      console.log('fetch newsletter:', Newsletter);
      res.status(200).send(Newsletter);
    } else {
      const posts = await newsletterModel.find();
      console.log('fetched newsletter:', posts);
      res.status(200).send(posts);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't Retrieve newsletter", details: error });
  }
};

// Update a newsletter by ID
exports.updateNewsletter = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const NewsletterFile = req.file ? req.file.filename : null;

  try {
    const Newsletter = await newsletterModel.findById(id);
    if (!Newsletter) {
      return res.status(404).send({ msg: 'newsletter not found' });
    }

    const updateData = {
      ...updates,
      Newsletter_pdfs: NewsletterFile || Newsletter.Newsletter_pdfs,
    };
    const updateNewsletter = await newsletterModel.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).send(updateNewsletter);
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't Update newsletter", error });
  }
};

// Delete a post by ID
exports.deleteNewsletter = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await newsletterModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).send({ msg: 'Post not found' });
    }
    res.status(200).send({ msg: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't Delete newsletter", details: error });
  }
};
