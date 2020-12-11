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

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
