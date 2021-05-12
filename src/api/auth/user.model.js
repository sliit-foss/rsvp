const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

/**
 *
 * @type {module:mongoose.Schema<any>}
 */
const UserSchema = mongoose.Schema(
  {
    username:String,
    email:String
  }
);

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User' , UserSchema)
