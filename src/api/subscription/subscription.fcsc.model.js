import { model, Schema } from 'mongoose';

/**
 *
 * @type {module:mongoose.Schema<any>}
 */
const fcscSubsctiptionSchema = new Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default model('FCSCSubscription', fcscSubsctiptionSchema);
