const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const adminAttendanceRoutes = require('./admin-attendance');
const studentAttendanceRoutes = require('./student-attendance');
const authenticate = require('../Middleware/authenticate');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/user', authenticate, userRoutes);
router.use('./api/v1/admin/attendance', authenticate, adminAttendanceRoutes);
router.use('./api/v1/student/attendance', authenticate, studentAttendanceRoutes)

module.exports = router;