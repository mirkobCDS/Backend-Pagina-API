const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users.controller')

router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getUserById);
router.delete('/:userId', UserController.deleteById);
router.post('/create', UserController.createUser);
router.patch('/:userId', UserController.updateUser);

module.exports = router;