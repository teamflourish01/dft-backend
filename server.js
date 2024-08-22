const express = require("express");

//swagger
const  sweggerjsdoc =require('swagger-jsdoc');
const swaggerui =require('swagger-ui-express');
const  swaggerdocument = require('./swagger.json')
// /
const { connection } = require("./db");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
// const homeRoutes = require("./home/homeRoutes");
const Homerouter = require("./modules/home/home.routes");
const notableAlumnirouter = require("./modules/notableAlumni/notableAlumni.routes")
const testimonialrouter = require("./modules/testimonial/testimonial.routes")
const aboutAlumnirouter = require("./modules/aboutAlumni/aboutAlumni.routes")
const newsletterrouter = require("./modules/newsletter/newsletter.routes")
const galleryrouter = require("./modules/gallery/gallery.routes")
const notablealumnipagesrouter = require("./modules/notableAlumniPages/notableAlumniPages.routes")
const alumnicommitieerouter = require("./modules/alumnicommitiee/alumnicommitiee.routes")
const deskfounder = require("./modules/deskfounder/deskfounder.routes");
const emailtwoRouter = require("./modules/Email/email.routes");
const UserRouter = require("./modules/user/user.routes");

const app = express(); 








// Middleware
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static("uploads"));


// swagger ui setup

app.use('/api-doc',swaggerui.serve,swaggerui.setup(swaggerdocument));


// Routes
app.use('/',UserRouter)
app.use('/', Homerouter);
app.use('/' ,notableAlumnirouter);
app.use('/' ,testimonialrouter);
app.use('/' ,aboutAlumnirouter);
app.use('/' ,newsletterrouter);
app.use('/' ,galleryrouter);
app.use('/' ,notablealumnipagesrouter);
app.use('/' ,alumnicommitieerouter);
app.use('/' ,deskfounder);
app.use('/',emailtwoRouter)

// Start the server
app.listen(process.env.PORT, async () => {
  console.log(`Server is Listening on ${process.env.PORT}`);
  try {
    await connection;
    console.log("Database connection established");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
});
