const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const tweetController = require('../controllers/tweetController');

// Create a new tweet
router.post(
  '/',
  [
    body('content').notEmpty().withMessage('Text is required'),
    body('author').notEmpty().withMessage('Author is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // If validation passes, call the controller method to create the tweet
    tweetController.createTweet(req, res);
  }
);

// Update a tweet
router.put(
  '/:id',
  [
    body('content').notEmpty().withMessage('Text is required'),
    body('author').notEmpty().withMessage('Author is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // If validation passes, call the controller method to update the tweet
    tweetController.updateTweet(req, res);
  }
);


// Get all tweets
router.get('/', tweetController.getAllTweets);


// Get a single tweet by ID
router.get('/:id', tweetController.getTweetById);


// Delete a tweet
router.delete('/:id', tweetController.deleteTweet);

module.exports = router;

