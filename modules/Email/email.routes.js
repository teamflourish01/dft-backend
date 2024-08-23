const express = require("express");
const emailtwoRouter = express.Router();

const emailcatalogController = require("../Email/emailController");

emailtwoRouter.post(
  "/twoemail/send-email",
  emailcatalogController.createContactmail
);
emailtwoRouter.get("/email", emailcatalogController.getEmail);
emailtwoRouter.delete("/email/delete/:id", emailcatalogController.deleteEmail);
module.exports = emailtwoRouter;
