const router = require('express').Router();
const userController = require('../Controller/user');

/**
 * Get user by id or email
 */
router.get('/:userid', userController.getUserById);

/**
 * Update user by id or email
 */
router.put('/:userid', userController.putUserById);

/*
Update user by id or email
*/
router.patch('/:userid', userController.patchUserById);
/**
 * Delete user by id
 */
router.delete('/:userid', userController.deleteUser);

/**
 * Get all user.
 * Filter
 * Sorting
 * Pagination
 */
router.get('/', userController.getUsers);

/**
 * Create new user.
 */
router.post('/', userController.postUser);

module.exports = router;