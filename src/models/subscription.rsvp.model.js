import { Schema, model } from 'mongoose';

/**
 *
 * @type {module:mongoose.Schema<any>}
 */
const rsvpSubsctiptionSchema = new Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default model('RSVPSubscription', rsvpSubsctiptionSchema);
