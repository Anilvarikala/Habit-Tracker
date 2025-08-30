
const express = require('express')
const userRouter = express.Router();
const userController = require('../controllers/userController');
const { checkAuthentication } = require('../middlewares/FrontendAuth');

userRouter.post("/signup", userController.Signup)
userRouter.get("/logout", userController.Logout)
userRouter.post("/login", userController.Login)
userRouter.get("/isauthenticated", checkAuthentication)
userRouter.post("/profile", userController.Profile)

module.exports = userRouter