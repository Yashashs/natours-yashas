/* eslint-disable */
const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true }); //since each router has access to its paramters of their specific routes and since here is no tourid so to get access to that paramter in other router we merge parameters

// POST /tour/234fad4/reviews
// POST /tour/234fad4/reviews
// POST /reviews

router.use(authController.protect);

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
        authController.restrictTo('user', 'admin'), reviewController.updateReview
    )
    .delete(
        authController.restrictTo('user', 'admin'), reviewController.deleteReview
    );

module.exports = router;
