require('dotenv').config()
const express = require('express');
const userRouter = require('./routes/userRouter');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session')
const mongoStore = require('connect-mongo');
const habitRouter = require('./routes/habitRouter');
const cors = require('cors')

// middle wares
app.use(express.json())
app.use(session({
  saveUninitialized : true,
  resave : false,
  secret : "Joymax@123",
  store : mongoStore.create({mongoUrl : process.env.mongoUrl})
}))

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use("/api/auth", userRouter)
app.use("/api/habit", habitRouter)


mongoose.connect(process.env.mongoUrl).then(() => {
     app.listen((process.env.PORT || 3000), () => {
     console.log(`Server is running at http://localhost:${process.env.PORT || 3000}`)
})})
.catch(err => console.log(err))
