import { Schema, model } from "mongoose";

/**
 *
 * @type {module:mongoose.Schema<any>}
 */
const eventSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String }, // markup?
    headerImage: { type: String },
    photos: { type: [String] },
    venue: { type: String, required: true },
    fromDate: { type: Date },
    toDate: { type: Date },
    status: { type: String },
    speakers: [{ type: String }], // TODO: change to object id, ref: speaker
    createdBy: { type: String }, // TODO: change to object id, ref: user
    host: { type: String }, // TODO: change to object id, ref: host
  },
  { timestamps: true }
);

export default model("event", eventSchema);
