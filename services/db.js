require("dotenv").config();
const mongoose = require("mongoose");

const DB_URI = process.env.MONGODB_URI
mongoose
  .connect(DB_URI)
  .then(() => {
    console.info("Database connection successful");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

  
