 const asyncHandler = require('express-async-handler')
 const Songs = require('../models/songsmodel')
 const User = require('../models/Usermodel')
const { Error } = require('mongoose')
const { text } = require('body-parser')
 
 //@desc gets the songs
 //@route GET/api/songs
 //@acess private
 const getsongs = asyncHandler( async (req ,res) => {
    
   //req.user = await User.findById(decoded.id).select('-password')

    const songs = await Songs.find({user: req.user.id})

    res.status(200).json(songs)
 } )


 //@desc sets the songs
 //@route GET/api/songs
 //@acess private
 const postsongs = asyncHandler( async (req ,res) => {

   if(!req.body.text){
       res.status(400)
       throw new Error('please add a textfild')
   }

   const song = await Songs.create({
     text: req.body.text,
     artist: req.body.artist,
     user:req.user.id
   })

   res.status(200).json(song)
} )


 //@desc updates the songs
 //@route GET/api/songs/:id
 //@acess private
 const putsongs = asyncHandler( async (req ,res) => {

   const song = await Songs.findById(req.params.id)

   if(!song){
      res.status(400)
      throw new Error (' dong not found')
   }
   //check user
   const user = await User.findById(req.user.id)
   if(!user){
      res.status(401)
      throw new Error ('no user detected')
   }
   //makes shure the logd user mach the song user
   if(song.user.toString() !== user.id){
      res.status(401)
      throw new Error ('user not autorized')
   }

   const newSong = await Songs.findByIdAndUpdate(req.params.id, req.body,{
      new: true
   })

    res.status(200).json(newSong)
 } )

 //@desc detelts the songs
 //@route GET/api/songs/:id
 //@acess private
 const deletesongs = asyncHandler( async (req ,res) => {
   
   const song = await Songs.findById(req.params.id)
   
   if(!song){
      res.status(400)
      throw new Error (' dong not found')
   }

   //check user
   const user = await User.findById(req.user.id)
   if(!user){
      res.status(401)
      throw new Error ('no user detected')
   }
   //makes shure the logd user mach the song user
   if(song.user.toString() !== user.id){
      res.status(401)
      throw new Error ('user not autorized')
   }


   const deleteSong = await Songs.findByIdAndDelete(req.params.id, null) 

    res.status(200).json({message: `the song ${req.params.id} is deleted `})
 } )





 module.exports = {
    getsongs,
    putsongs,
    deletesongs,
    postsongs 
}