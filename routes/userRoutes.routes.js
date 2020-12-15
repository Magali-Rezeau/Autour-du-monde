const express = require('express');
const authController = require('../controllers/authController.controllers');
const userController = require('../controllers/userController.controllers');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router.patch('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updatePassword',
  authController.protectRoute,
  authController.updatePassword
);

router.patch(
  '/updateUserProfile',
  authController.protectRoute,
  userController.updateUserProfile
);

router.delete(
  '/deleteUserProfile',
  authController.protectRoute,
  userController.deleteUserProfile
);

router.route('/:id').get(userController.getUser);

module.exports = router;
