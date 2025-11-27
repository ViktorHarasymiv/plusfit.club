import { verifyUserEmail } from '../services/verify.js';

export const verifyEmailController = async (req, res) => {
  try {
    const { email, code } = req.body;
    const result = await verifyUserEmail(email, code);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
