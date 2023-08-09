const express = require ('express')
const router = express.Router()
const {getsongs, postsongs,deletesongs, putsongs} = require ('../controllers/getcontrollers')

const {protect} = require('../middleware/authenticateMiddleware')

router.route('/').get(protect,getsongs).post(protect,postsongs)

router.route('/:id').put(protect,putsongs).delete(protect,deletesongs)


module.exports =router