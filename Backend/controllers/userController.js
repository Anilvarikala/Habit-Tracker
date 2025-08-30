
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function createToken(id){
   return jwt.sign({id}, process.env.jwtSecretkey)
}

exports.Signup = async (req, res) => {
    console.log(req.body)
    const {name, email, password} = req.body;
    
    const found = await User.find({email : email})
    if(found.length != 0){
      // not there
     return res.json({
        success : false,
        message : "Email already exist"
      })
    }
  
    const hashedPassword = await bcrypt.hash(password, 10)
  
    const newUser = new User({name, email, password : hashedPassword})
    const user = await newUser.save()
    const token = createToken(user._id)
    req.session.user = user
    return res.json({
      success : true,
      message : 'User created successfully!',
      token : token,
      appId : user._id
    })
}

exports.Logout = async (req, res) => {
   req.session.destroy()
   res.json({
    success : true,
    message : "Logout success!"
   })
}

exports.Login = async (req, res) => {
   const {email, password} = req.body;

   // check the mail exists or not.
   const exist = await User.find({email : email})
   if(exist.length == 0){
    // email not exists.
     return res.json({
      success : !true,
      message : "Email not registered!"
     })
   }

   // email matched and now match password
   const matched = await bcrypt.compare(password, exist[0].password)

   if(!matched) return res.json({success : false, message : "Password not matching"})

   // login karo
   const token = createToken(exist[0]._id) 
   req.session.user = exist[0]

   return res.json({
    success:true,
    message : "Login success",
    token : token,
    appId : exist[0]._id 
    

   })
}

exports.Profile = async (req, res) => {
    console.log(req.body)
    const {userId} = req.body;
    const user = await User.findOne({_id : userId});
    if(user === undefined){
      return res.json({
        success : false,
        message : "Profile not exists."
      })
    }

   return res.json({
    success : true,
    name : user.name,
    email : user.email
   }) 
}