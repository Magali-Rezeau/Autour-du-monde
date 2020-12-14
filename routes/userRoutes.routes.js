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
  '/updateProfileUser',
  authController.protectRoute,
  userController.updateProfileUser
);

router.delete(
  '/deleteProfileUser',
  authController.protectRoute,
  userController.deleteProfileUser
);

router.route('/:id').get(userController.getUser);

module.exports = router;
