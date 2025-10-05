import createHttpError from 'http-errors';
import {
  createMessage,
  deleteMessage,
  getAllMessage,
  updateMessageIsRead,
} from '../services/message.js';

// ALL

export const getMessageController = async (req, res) => {
  const message = await getAllMessage();

  res.status(200).json({
    status: 200,
    message: 'Successfully found message!',
    result: message,
  });
};

// CREATE

export const createMessageController = async (req, res) => {
  const result = req.body;

  const review = await createMessage(result);

  res.status(201).json({
    status: 201,
    message: 'Відгук успішно створений!',
    data: review,
  });
};

// DELETE

export const deleteMessageController = async (req, res, next) => {
  const { messageId } = req.params;

  const message = await deleteMessage(messageId);

  if (!message) {
    next(createHttpError(404, 'Message not found'));
    return;
  }

  res.status(204).send();
};

// PATCH

export const patchMessageController = async (req, res) => {
  const { messageId } = req.params;

  const { isRead } = req.body;

  try {
    const message = await updateMessageIsRead(messageId, { isRead });

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a message !',
      data: message,
    });
  } catch (error) {
    console.error('PATCH message error:', error);
  }
};
