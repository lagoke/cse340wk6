// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")

const regValidate = require('../utilities/account-validation')



router.get("/login", utilities.handleErrors(accountController.buildLogin))


//router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement))

router.get("/",  utilities.handleErrors(accountController.buildAccountManagement))

router.get("/allAccounts",  utilities.handleErrors(accountController.buildAllAccountManagement))



// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)



router.get("/register", utilities.handleErrors(accountController.buildRegister))

//router.post('/register', utilities.handleErrors(accountController.registerAccount))

// Process the registration data
router.post(  
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )



  router.get("/updateAccount", utilities.handleErrors(accountController.updateAccount))



// Route to build login view
//router.get("/account/login", accountController.buildLogin);


// Route to build inventory by classification view
//router.get("/type/:classificationId", invController.buildByClassificationId);



// Process the login attempt
router.post(
  "/login",
  (req, res) => {
    res.status(200).send('login process')
  }
)


module.exports = router; 