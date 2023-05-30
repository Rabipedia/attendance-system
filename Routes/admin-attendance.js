const router = require('express').Router();
const { getEnable, getDisable} = require('../Controller/admin-attendance');

router.get('/enable', getEnable);
router.get('/disable', getDisable);

module.exports = router;