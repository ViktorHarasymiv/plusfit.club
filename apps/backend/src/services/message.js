import { MessagesCollection } from '../db/models/message.js';

// GET

export const getAllMessage = async (query, sort = { createdAt: -1 }) => {
  const message = await MessagesCollection.find(query).sort(sort).lean();

  return {
    data: message,
  };
};

// CREATE

export const createMessage = async (payload) => {
  const message = await MessagesCollection.create(payload);
  return message;
};

// DELETE

export const deleteMessage = async (messageId) => {
  const message = await MessagesCollection.findOneAndDelete({ _id: messageId });
  return message;
};

// PATCH

export const updateMessageIsRead = async (messageId, payload, options = {}) => {
  const updatedMessage = await MessagesCollection.findByIdAndUpdate(
    messageId,
    { $set: payload },
    { new: true, ...options },
  );

  if (!updatedMessage) return null;

  return {
    message: updatedMessage,
    updatedField: 'isRead',
    isNew: false,
  };
};
