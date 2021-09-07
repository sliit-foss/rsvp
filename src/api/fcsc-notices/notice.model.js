import { Schema, model } from 'mongoose';

/**
 *
 * @type {module:mongoose.Schema<any>}
 */

const noticeSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  category: {
    type: String,
    enum: ['Latest', 'Older'],
    required: true,
  },
  photo: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export default model('Notice', noticeSchema);
