const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const authenticate = require('../Middleware/authenticate');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/user', authenticate, userRoutes);

module.exports = router;