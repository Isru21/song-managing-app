 const jwt = require('jsonwebtoken')
 const bcrypt = require('bcryptjs')
 const asyncHandler = require('express-async-handler')
 const User = require('../models/Usermodel')
 
 //@desc registers the user 
 //@route POST/api/users
 //@acess private
const registerUser = asyncHandler( async(req, res) => {
    const {name, email, password} = req.body

    if(!name|| !email|| !password) {
        res.status(400)
        throw new Error('please fill all the textfild')
    }
//check if our user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('user already registerd')
    }

//hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash (password, salt)

//creat the user
    const user = await User.create({
        name,
        email,
        password: hashedpass

    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token: generatetoken(user._id)
         
        })
      
    }else{
        res.status(400)
        throw new Error ('invalid user data')
    }

   
})


 //@desc gets the usrs info
 //@route GET/api/users/me
 //@acess private
const getMe =  asyncHandler( async(req, res)=> {

    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
        
    })

   
})

 //@desc autenticates the user
 //@route POST/api/users/login
 //@acess private
 const loginUser =  asyncHandler( async(req, res)=> {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
            
            _id:user.id,
            name:user.name,
            email:user.email,
            token: generatetoken(user._id)
      })
    }else{
        res.status(400)
        throw new Error ('invalid credinctials')
    }

    


    // res.status(200).json({message: 'login user'})
})


const generatetoken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '10d'})
}
module.exports = {registerUser, getMe, loginUser}