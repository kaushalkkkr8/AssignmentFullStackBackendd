const { signUp, logIn } = require("../Controller/login")
const { signUpValidation, logInValidation } = require("../Middleware/authValidation")

const router= require("express").Router()

router.post("/signup",signUpValidation,signUp)
router.post("/login",logInValidation,logIn)

module.exports=router