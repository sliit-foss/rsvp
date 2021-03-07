import { Schema, model } from "mongoose";

/**
 *
 * @type {module:mongoose.Schema<any>}
 */
const attendeeSchema = new Schema(
  {
    firstName: { type: String, required: true, unique: true, lowercase: true },
    lastName: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    contactNo: { type: String, required: true, unique: true, lowercase: true },
    previlege: { type: String, required: true, unique: true, lowercase: true },
  },
  { timestamps: true }
);

export default model("Attendees", attendeeSchema);
