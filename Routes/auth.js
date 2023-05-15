const router = requre('express').Router();
const { loginConroller, registerController } = require('../Controller/auth');

router.post('/register', registerController);
router.post('/login', loginConroller);

module.exports = router;