
const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema({
  habitName : {
    type : String, required : true,
    unique : true,
  },
})

module.exports = mongoose.models.Habit || mongoose.model('Habit', habitSchema)