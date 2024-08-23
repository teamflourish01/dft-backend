const nodemailer = require("nodemailer");
require("dotenv").config();
const fs = require("fs");
const { emailModel } = require("./emailModel");

// Use connection pooling for better performance
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  pool: true, // Enable connection pooling
  rateLimit: 5, // Limit to 5 emails per second
});

exports.createContactmail = async (req, res) => {
  const { name, email, contactNumber, Message } = req.body;

  if (!name || !email || !contactNumber || !Message) {
    return res.status(400).send("All fields are required");
  }

  try {
    const userMailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "DFT Alumni",
      text: "Thank you for your message.",
      html: "<p>Thank you for your message, <br/><br/>",
    };

    const clientMailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "DFT Website Form Fillup User Data",
      text: `This User Form submit:\n\nName: ${name}\nEmail: ${email}\nContact Number: ${contactNumber}\nMessage: ${Message}`,
    };

    // Send emails concurrently
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    // //save Data to DB
    // const newEmail = new emailModel({
    //   name,
    //   email,
    //   contactNumber,
    //   Message,
    // });
    // await newEmail.save();

    res.status(200).send("Emails sent successfully");
  } catch (error) {
    res.status(500).send("Error sending emails: " + error.toString());
  }
};

exports.getEmail = async (req, res) => {
  let { page, search } = req.query;
  let query = {};
  let data, total;
  try {
    if (search) {
      query.name = { $regex: `^${search}`, $options: `i` };
      data = await emailModel.find(query);
      total = data.length;
    } else {
      total = await emailModel.countDocuments(query);
      data = await emailModel
        .find(query)
        .skip((page - 1) * 12)
        .limit(12);
    }
    res.status(200).send({
      data,
      count: total,
      msg: "User found with pagination successfully",
    });
  } catch (error) {
    res.status(400).send({
      error,
      msg: error.message,
    });
  }
};
exports.deleteEmail = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await emailModel.findByIdAndDelete(id);
    res.status(200).send({
      data,
      msg: "Inquiry Removed Sucessfully",
    });
  } catch (error) {
    res.status(400).send({
      error,
      msg: error.message,
    });
  }
};
