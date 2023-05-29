const mongoose = require('mongoose');

// Define the Tweet schema
const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Tweet model
const Tweet = mongoose.model('Tweet', tweetSchema);

// Export the Tweet model
module.exports = Tweet;
