const express = require('express');
const tourController = require('./../controllers/tourController.controllers');
const router = express.Router();

router.param('id', tourController.checkId);
router.param('body', tourController.checkBody);
router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;