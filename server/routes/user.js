const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const userController = require("../controller/userController")
const userValidation= require("../middleware/userValidation")


router.post("/signUp", userValidation.userValidatesignUp, userController.signUp)
router.post("/signIn", userValidation.userValidatesignIn, userController.signIn)
router.get("/getUser", auth, userController.getUser)
router.put('/verifyMail', userController.verifyMail)


module.exports = router