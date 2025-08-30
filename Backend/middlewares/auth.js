
const jwt = require('jsonwebtoken')

exports.checkAuthentication = async (req, res, next) => {
  //console.log(req.headers)
     const {token, userid} = req.headers;
     
    try{
     const {id} = await jwt.verify(token, process.env.jwtSecretkey)
     if(id === userid){
        // nice authenticated
        return next();
     }
    }
    catch(err){

      res.json({
        message:"Invalid token",
        error : err
      })
    }
     
}