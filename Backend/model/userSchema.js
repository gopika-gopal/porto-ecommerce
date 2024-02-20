const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define a simple user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 12,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 12,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 6,
        maxlength: 12,
      }
    }
  ]
});

//Hashing the password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
  }
  next();
});

//Generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);

    return token;
  }
  catch (err) {
    console.log(err);
  }
};
// this.tokens = this.token.concat({ token: token });
// await this.save();

//create a usermodel for CURD operation OR Collection Creation
const user = new mongoose.model("users", userSchema);
module.exports = user;