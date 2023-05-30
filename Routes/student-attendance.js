const router = require('express').Router();
const { getAttendance, getAttendanceStatus } = require('../Controller/student-attendance');

router.get('/status', () => { });
router.get('/:id', () => {});

module.exports = router;