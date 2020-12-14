const express = require('express');
const authController = require('../controllers/authController.controllers');
const tourController = require('../controllers/tourController.controllers');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protectRoute, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(authController.protectRoute, tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protectRoute,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
