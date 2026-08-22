const {Router}=require("express")
const authRouter=Router()
const authController=require("../controller/auth.controller")
const authMiddleware=require("../middlewares/auth.middleware")
/**
 * @route PATH /api/auth/register
 * @description refister a new user
 * @access public
 */

authRouter.post("/register",authController.registerUserController)
/**
 *@route PATH /api/auth/login
 * @description login a  user
 * @access public
 */
authRouter.post("/login",authController.loginUserController)

/**
 *@route GET /api/auth/logout
 * @description clear token from the user cookie and add the token in the blackilist
 * @access public
 */
authRouter.get("/logout",authController.logoutUserController)

/**
 *@route GET /api/auth/get-me
 * @description get the current logged in user detail
 * @access private
 */
authRouter.get("/get-me",authMiddleware.authUser,authController.getmecontroller)

module.exports=authRouter