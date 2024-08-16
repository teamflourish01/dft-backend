const express = require("express");
const emailtwoRouter = express.Router();

const emailcatalogController = require("../Email/emailController");

emailtwoRouter.post("/twoemail/send-email", emailcatalogController.createContactmail);

module.exports = emailtwoRouter;