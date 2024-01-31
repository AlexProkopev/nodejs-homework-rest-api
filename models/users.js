
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      
    },
    name: {
      type: String,
      required: true,
      minlength: 4,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    
  }, {versionKey: false,timestamps: true});

  const User = mongoose.model("User", userSchema);

  module.exports = {User};





    