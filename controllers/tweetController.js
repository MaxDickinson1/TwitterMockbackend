const Tweet = require('../models/tweet');
const { validationResult } = require('express-validator');

// Controller function to create a new tweet
exports.createTweet = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, author } = req.body;

    const newTweet = new Tweet({
      content,
      author,
    });

    const savedTweet = await newTweet.save();

    res.status(201).json(savedTweet);
  } catch (error) {
    next(error);
  }
};

// Controller function to get all tweets
exports.getAllTweets = async (req, res, next) => {
  try {
    const tweets = await Tweet.find().sort('-createdAt');

    res.status(200).json(tweets);
  } catch (error) {
    next(error);
  }
};

// Controller function to get a single tweet by ID
exports.getTweetById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tweet = await Tweet.findById(id);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    res.status(200).json(tweet);
  } catch (error) {
    next(error);
  }
};

// Controller function to update a tweet
exports.updateTweet = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { content } = req.body;

    const tweet = await Tweet.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    res.status(200).json(tweet);
  } catch (error) {
    next(error);
  }
};

// Controller function to delete a tweet
exports.deleteTweet = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tweet = await Tweet.findByIdAndDelete(id);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    res.status(200).json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    next(error);
  }
};
