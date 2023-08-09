const mongoose = require('mongoose')

const songschema = mongoose.Schema ({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

    text: {
        type: String,
        required: (true, 'please enter a song'),
       // req.user = await User.findById(decoded.id).select('-password')

    },

    artist:{
        type: String,
        required: (true, 'please enter an artist'),
    }
    

}, 
    {
        timestamps : true, 
    }

    
)

module.exports = mongoose.model('Songs', songschema )