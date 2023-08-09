const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/Usermodel')

const protect = asyncHandler(async (req, res, next)=> {

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      try{  // get token from header
        token = req.headers.authorization.split(' ')[1]

        //verifay token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //get user from the token
        req.user = await User.findById(decoded.id).select('-password')

        next()}

        catch (error){
            // video36:17
            console.log(error)
            res.status(401)
            throw new Error('not autorized')
        }

        }if(!token){
          res.status(401)
          throw new Error('no token detected')
        }

})

module.exports = {protect}

 