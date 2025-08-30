
const jwt = require('jsonwebtoken')

exports.checkAuthentication = async (req, res, next) => {
  const {token} = req.headers
  console.log(token)
    try{
     const userId = await jwt.verify(token, process.env.jwtSecretkey)
     console.log(userId.id + " " + req.session.user._id.toString() )
     if(userId.id === req.session.user._id.toString()){
        // nice authenticated
        return res.json({
          success : true,
          message : "User Authenticated!"
        })
     }
    }
    catch(err){

      res.json({
        message:"Invalid token",
        success : false,
        error : err
      })
    }
     
}