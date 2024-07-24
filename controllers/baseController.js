const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  
  req.flash("notice", "This is a flash message.")
  
  res.render("index", {title: "Home", nav})
}



baseController.buildNewHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("error/error_assignment", {title: "Home", nav})
}






module.exports = baseController