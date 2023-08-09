const express = require ('express')
const router = express.Router()
const {registerUser,loginUser, getMe } = require ('../controllers/userController')
// loginUser,getUserInfo
const {protect} = require ('../middleware/authenticateMiddleware')

router.post('/', registerUser)
router.get('/me',protect , getMe )
router.post('/login',loginUser )

module.exports = router