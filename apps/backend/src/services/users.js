import { UsersCollection } from '../db/models/user.js';

export const updateUser = async (id, payload, options = {}) => {
  console.log('updateUser payload:', payload);
  const updatedUser = await UsersCollection.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, ...options },
  );

  if (!updatedUser) return null;

  return {
    user: updatedUser,
    isNew: false,
  };
};
