const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        require: [true, 'Enter an email address.'],
        unique: [true, 'That email address is taken.'],
        lowercase: true,
        validate: [validator.isEmail, 'Enter a valid email address.']
    },
    username: {
       type: String,
       required: [true, 'Enter a username.'],
       unique: [true, 'That username is taken.'],
       lowercase: true,
       validate: [validator.isAlphanumeric, 'Usernames may only have letters and numbers.']
    },
    password: {
        type: String,
        required: [true, 'Enter a password.'],
        minLength: [4, 'Password should be at least four characters']
    },
});
//schema middleware to apply before saving
userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
      next();
});
const User = mongoose.model('User', userSchema);
module.exports = User;