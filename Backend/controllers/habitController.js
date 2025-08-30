
const Habit = require('../models/habit');
const User = require('../models/user')


exports.streakIncrease = async (req, res) => {
   // the curremt user lo some habit id yokka streak increse chayyali..
   //const {habitId} = req.body;
   const {userId, habitId} = req.body
   console.log(req.body)

   const user = await User.findById({_id : userId})
   console.log(user) 
   if(!user) return res.json({ message : "User not there.. Login again"})

   const currHabit = await user.habits.filter((habit) => habit.habitId.toString() === habitId)
   const remHabits = await user.habits.filter((habit) => habit.habitId.toString() !== habitId)
   console.log(currHabit)
   currHabit[0].streak++;
   console.log(currHabit)

   user.habits = [...remHabits, currHabit[0]]
   const updatedUser = await user.save()

   return res.json({
     success : true,
     message : "Streak updated..."
   })

}


exports.addHabit = async (req, res) => {

  const {habitName} = req.body;
  const {userId} = req.body;
  console.log(req.body)

  const user = await User.findOne({_id : userId})
  const exist = await Habit.find({habitName : habitName})

  if(exist.length == 0){
    // habit not there.
    const newHabit = new Habit({
      habitName : habitName
    })
    const currHabit = await newHabit.save()
    // add the current habit to the current user.
    const habitId = currHabit._id
    await user.habits.push({
       habitId : habitId,
       habitName : habitName  
    })
    await user.save()
    return res.json({
      success : true,
      message:"Habit addedd successfully!",
      habit : {
        habitId : habitId,
       habitName : habitName,
       streak : 0

      }
    })

  }

  else{
    
    const currHabit = exist[0];
    const habitId = currHabit._id
    await user.habits.push({
      habitId : habitId,
      habitName : currHabit.habitName,
      streak : 0
    })
    await user.save();
    return res.json({
      success : true,
      message : 'Habit added successfully!',
      habit : {
      habitId : habitId,
      streak : 0,
      habitName : currHabit.habitName
    }
    })
  
  }

}


exports.removeHabit = async (req, res) => {
   const {userId, habitId} = req.body;
  // const {userId} = req.body
   console.log(req.body)
   // remove this habit data from the current user.
   const user = await User.findById({_id : userId})
   user.habits = user.habits.filter((habit) => habit.habitId.toString() !== habitId)
   await user.save()
   res.json({
    success : true,
    message : "Habit deleted...!"
   })

}


exports.getHabits = async (req, res) => {

   const {userId} = req.body

   const user = await User.findById({_id : userId})

   const userHabits = user.habits

   res.json({
    success : true,
    message : "Here are the habits of the user..",
    habits : userHabits
   })


}



