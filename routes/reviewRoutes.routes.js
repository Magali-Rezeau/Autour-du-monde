const express = require('express');
const reviewController = require('../controllers/reviewController.controllers');
const authController = require('../controllers/authController.controllers');

const router = express.Router({ mergeParams: true });

// Protect all routes after this middleware
router.use(authController.protectRoute);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
