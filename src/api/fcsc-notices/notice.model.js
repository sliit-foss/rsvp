import { Schema, model } from 'mongoose';

/**
 *
 * @type {module:mongoose.Schema<any>}
 */

const noticeSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    category: {
        type: String,
        enum: ['Latest', 'Older'],
        required: true,
      },
  },
);

export default model('Notice', noticeSchema);
