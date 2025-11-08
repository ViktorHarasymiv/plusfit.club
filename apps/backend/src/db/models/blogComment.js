import { model, Schema } from 'mongoose';

const commentSchema = new Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('Comment', commentSchema);
