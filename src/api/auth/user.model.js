import {model, Schema} from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

/**
 *
 * @type {module:mongoose.Schema<any>}
 */
const userSchema = new Schema(
    {
        username: String,
        email: String
    }
);

userSchema.plugin(passportLocalMongoose);
export default model('User', userSchema);
