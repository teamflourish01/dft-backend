const sharp = require("sharp");

const MultipleImage = (width, height) => {
  return async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    try {
      for (const file of req.files) {
        const metadata = await sharp(file.path).metadata();

        if (metadata.width !== width || metadata.height !== height) {
          return res.status(400).send(`Image dimensions must be ${width}x${height} pixels.`);
        }
      }
      next();
    } catch (error) {
      console.error("Error validating image dimensions:", error);
      return res.status(500).send("Error processing images.");
    }
  };
};

module.exports = MultipleImage;
