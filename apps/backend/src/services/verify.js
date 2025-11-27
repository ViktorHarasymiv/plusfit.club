import { UsersCollection } from '../db/models/user.js';

export const verifyUserEmail = async (email, code) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) throw new Error('User not found');

  if (user.isVerified) throw new Error('User already verified');

  if (user.verifyCode !== code) throw new Error('Invalid code');

  if (Date.now() > user.verifyExpires) {
    await UsersCollection.deleteOne({ _id: user._id });
    throw new Error('Code expired, account removed');
  }

  user.isVerified = true;
  user.verifyCode = undefined;
  user.verifyExpires = undefined;
  await user.save();

  return { message: 'Account verified successfully' };
};
