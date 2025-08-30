

const express = require('express')
const habitRouter = express.Router();

const habitController = require('../controllers/habitController')
const auth = require('../middlewares/auth')

habitRouter.post("/add", auth.checkAuthentication, habitController.addHabit)
habitRouter.post("/streakplus",auth.checkAuthentication, habitController.streakIncrease)
habitRouter.post("/remove", habitController.removeHabit)
habitRouter.post("/allhabits" ,auth.checkAuthentication,habitController.getHabits) // add the authentication to every api.

module.exports = habitRouter