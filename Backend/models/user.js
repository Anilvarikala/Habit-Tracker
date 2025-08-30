const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  habits: [
    {
      habitId: {
        type: mongoose.Schema.Types.ObjectId,  
        required: true,
      },
      habitName: {
        type: String,
        required: true,
      },
      streak: {
        type: Number,
        default: 0,
      },
    },
  ],
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
