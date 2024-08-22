const { galleryModel } = require("./galleryModel");

// Create a new post
exports.addGallery = async (req, res) => {
  try {
    const galleryFiles = req.files
      ? req.files.map((file) => file.filename)
      : [];

    const gallery = new galleryModel({
      Gallery_images: galleryFiles,
    });
    await gallery.save();
    res.status(200).json({ msg: "Gallery added successfully", data: gallery });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Couldn't Add gallery", error });
  }
};

// Get all gallery or a single gallery by ID
exports.getGallery = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const gallery = await galleryModel.findById(id);
      if (!gallery) {
        return res.status(404).send({ msg: "Gallery not found" });
      }

      res.status(200).send(gallery);
    } else {
      const galleries = await galleryModel.find();

      res.status(200).send(galleries);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't retrieve gallery", details: error });
  }
};

// Update a gallery by ID
exports.updateGallery = async (req, res) => {
  const { id } = req.params;
  const { deleteImages = [] } = req.body; // Array of image filenames to delete
  const updates = req.body; // Other fields to update
  const galleryFiles = req.files ? req.files.map((file) => file.filename) : [];

  try {
    const gallery = await galleryModel.findById(id);
    if (!gallery) {
      return res.status(404).send({ msg: "Gallery not found" });
    }

    // Step 1: Remove images that are specified for deletion
    const updatedImages = gallery.Gallery_images.filter(
      (image) => !deleteImages.includes(image)
    );

    // Step 2: Add new images to the filtered array
    const finalImages = [...updatedImages, ...galleryFiles];

    // Step 3: Create the update data with the final images array
    const updateData = {
      ...updates,
      Gallery_images: finalImages,
    };

    // Step 4: Update the gallery with the new data
    const updatedGallery = await galleryModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res
      .status(200)
      .send({ msg: "Gallery Update Successfuly", data: updatedGallery });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Couldn't update gallery", error });
  }
};

// Delete a gallery by ID
exports.deleteGallery = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGallery = await galleryModel.findByIdAndDelete(id);
    if (!deletedGallery) {
      return res.status(404).send({ msg: "Gallery not found" });
    }
    res.status(200).send({ msg: "Gallery deleted successfully" });
  } catch (error) {
    res.status(400).send({
      msg: "Couldn't delete gallery",
      details: error,
    });
  }
};
