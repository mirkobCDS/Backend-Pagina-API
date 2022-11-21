const express = require('express');
const verify = require('./verifyToken');
const router = express.Router();
const UserController = require('../controllers/users.controller')

router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getUserById);
router.get('/mail/:mail', UserController.getUserByMail);
router.delete('/:userId', UserController.deleteById);
router.post('/create', UserController.createUser);
router.patch('/:userId', UserController.updateUser);
router.post('/login', UserController.loginUser);

module.exports = router;