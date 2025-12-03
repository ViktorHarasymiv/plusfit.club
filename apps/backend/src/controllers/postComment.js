import { postCommentCollection } from '../db/models/postComment.js';
import { UsersCollection } from '../db/models/user.js';

export const createPostCommentController = async (req, res) => {
  try {
    const { postId, userId, text } = req.body;

    const user = await UsersCollection.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const comment = new postCommentCollection({
      postId,
      userId,
      text,
      userSnapshot: {
        name: user.name,
        avatar: user.avatar,
        role: user.role,
      },
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostCommentController = async (req, res) => {
  try {
    const { postId } = req.params;

    const postComment = await postCommentCollection
      .find({ postId })
      .sort({ createdAt: -1 });

    if (!postComment || postComment.length === 0) {
      return res
        .status(201)
        .json({ message: 'No comments found for this post' });
    }

    res.status(201).json(postComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
