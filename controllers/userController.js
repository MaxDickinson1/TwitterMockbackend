const User = require('../models/user');

// Controller function for a user to follow another user
exports.followUser = async (req, res, next) => {
  try {
    const { userId, followId } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the follow user exists
    const followUser = await User.findById(followId);
    if (!followUser) {
      return res.status(404).json({ message: 'Follow user not found' });
    }

    // Check if the user is already following the follow user
    if (user.followers.includes(followId)) {
      return res.status(400).json({ message: 'User is already following the follow user' });
    }

    // Update the user's followers array
    user.followers.push(followId);
    await user.save();

    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    next(error);
  }
};
