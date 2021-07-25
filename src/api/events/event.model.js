import { Schema, model } from "mongoose";

/**
 *
 * @type {module:mongoose.Schema<any>}
 */

const speakerSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  company: { type: String, required: true },
  topic: { type: String, required: true },
  photo: { type: String, required: true },
  twitterURL: { type: String, required: true },
  linkedInURL: { type: String, required: true },
});

const eventSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    headerImage: { type: String, required: true },
    photos: { type: [String] },
    venue: { type: String, required: true },
    date: { type: String, required: true },
    fromTime: { type: String, required: true },
    toTime: { type: String, required: true },
    status: { type: String, required: true },
    category: { type: String, required: true },
    speakers: [{ type: speakerSchema }],
    createdBy: { type: String }, // TODO: change to object id, ref: user
    host: { type: String }, // TODO: change to object id, ref: host
  },
  { timestamps: true }
);

export default model("Event", eventSchema);
