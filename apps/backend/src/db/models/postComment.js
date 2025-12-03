import { model, Schema } from 'mongoose';

const postCommentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'posts', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  text: { type: String, required: true },
  userSnapshot: {
    name: String,
    avatar: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export const postCommentCollection = model('postComments', postCommentSchema);
