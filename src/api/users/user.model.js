import { model, Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

/**
 *
 * @type {module:mongoose.Schema<any>}
 */
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['Admin', 'Publisher'],
    required: true,
  },
  faculty: {
    type: String,
    enum: ['FOSS', 'FCSC', 'MS Club', 'Media Unit', 'SLIIT Cyber Security Community', 'SESC'],
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);
export default model('User', userSchema);
