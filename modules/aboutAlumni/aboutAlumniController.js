const { aboutAlumniModel } = require('./aboutAlumniModel');

// Create a new post
exports.addAbout = async (req, res) => {
    try {
        const { About_heading, About_text, Our_mision_heading, Our_mision_text, Our_vision_heading, Our_vision_text } = req.body;
        const About_images = req.file ? req.file.filename : "";

        const Aboutalumni = new aboutAlumniModel({
            About_heading,
            About_text,
            Our_mision_heading,
            Our_mision_text,
            Our_vision_heading,
            Our_vision_text,
            About_images,
        });

        await Aboutalumni.save();
        res.status(200).json({ msg: "About added successfully", Aboutalumni });
    } catch (error) {
        res.status(400).json({ error: "Couldn't add About", error });
    }
};

// Get all posts
exports.getAbout = async (req, res) => {
    try {
        const posts = await aboutAlumniModel.find();
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send({ msg: "Couldn't retrieve About", error });
    }
};

// Update a post by ID
exports.updateAbout = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) {
        updates.About_images = req.file.filename;
    }

    try {
        const updatedPost = await aboutAlumniModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedPost) {
            return res.status(404).send({ msg: 'Post not found' });
        }
        res.status(200).send(updatedPost);
    } catch (error) {
        res.status(400).send({ msg: "Couldn't update About", error });
    }
};

// Delete a post by ID
exports.deleteAbout = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPost = await aboutAlumniModel.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).send({ msg: 'Post not found' });
        }
        res.status(200).send({ msg: 'Post deleted successfully' });
    } catch (error) {
        res.status(400).send({ msg: "Couldn't delete About", error });
    }
};
