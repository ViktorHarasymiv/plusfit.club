import { model, Schema } from 'mongoose';

const PostSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  title: { type: String, required: true },
  content: { type: [String], required: true },
  quote: {
    text: { type: String, required: false },
    author: { type: String, default: '', required: false },
  },
  author: { type: String },
  images: { type: [String], required: false },
  tags: { type: [String], default: [] },
  views: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] }, // масив userId
  likes: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  isNews: { type: Boolean, default: true },
  isPrivate: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const PostCollection = model('posts', PostSchema);
