const express = require('express');
const authController = require('../controllers/authController.controllers');
const userController = require('../controllers/userController.controllers');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.get('/logout', authController.logout);

router.patch('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protectRoute);

router.patch('/updatePassword', authController.updatePassword);
router.get(
  '/userProfile',
  userController.getUserProfile,
  userController.getUser
);
router.patch('/updateUserProfile', userController.updateUserProfile);
router.delete('/deleteUserProfile', userController.deleteUserProfile);

// Restriction routes after this middleware
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
