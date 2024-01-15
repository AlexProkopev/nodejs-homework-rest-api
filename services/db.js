require("dotenv").config();
const mongoose = require("mongoose");


console.log(process.env.MONGODB_URI);

// const DB_URI = process.env.MONGODB_URI
const DB_URI ="mongodb+srv://useradmin:Disk2010@cluster-1.r43zgoe.mongodb.net/contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_URI)
  .then(() => {
    console.info("Database connection successful");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

  
