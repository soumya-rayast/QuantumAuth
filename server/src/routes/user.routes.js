const { register, login, getUsers, userStatus } = require('../controllers/user.routes');
const authMiddleware = require('../middleware/auth');

const router = require('express').Router();

router.post('/register', register)
router.post('/login', login)
router.get('/allUsers', authMiddleware, getUsers)
router.post('/updateStatus', authMiddleware, userStatus);

module.exports = router;