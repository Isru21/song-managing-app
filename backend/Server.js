const express = require ('express')
const colors = require ('colors')
const dotenv = require ('dotenv').config()
const connectDB= require ('./config/db')
// const songschema = require ('./models/songsmodel')
// try this with the server and the controllers yo idea son 
const {errorHandler}= require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

connectDB()

const app = express()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/songs', require('./routes/songrouts'))
app.use('/api/users', require('./routes/userRouts'))

app.use(errorHandler)


app.listen(port, () => console.log(`serever started on ${port}`))