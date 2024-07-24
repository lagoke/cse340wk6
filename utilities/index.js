const invModel = require("../models/inventory-model")
const accountModel = require("../models/account-model")

const jwt = require("jsonwebtoken")
require("dotenv").config()

const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}



/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)





/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }




/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }


module.exports = Util


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }





/* ************************
 * Build the account view HTML
 ************************** */
Util.buildAccountGrid = async function (req, res, next) {
  let data = await accountModel.getAccountRecords()
  let grid = '<table id="customers"><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Account Type</th><th>Action 1</th><th>Action 2</th></tr>'

  data.rows.forEach((row) => {
    grid += '<tr><td>' + row.account_firstname + '</td><td>' + row.account_lastname + '</td><td>' + row.account_email + '</td><td>' + row.account_type + '</td><td><a href="">Activate Account</a></td><td><a href="">De-activate Account</a></td></tr>'

  })
  grid += '</table>'
  return grid
}






  
/* **************************************
* Build the Inverntory detail view HTML
* ************************************ */
Util.buildInventoryDetailGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<main><section class="features-reviews"><div class="features">'
    data.forEach(vehicle => { 
      grid += '<h3>'+ vehicle.inv_make + " " +  vehicle.inv_model + '</h3>'
      grid +=  '<ul><li class="feature-item"><div class="feature-box2">'
      grid += ' <img src="' + vehicle.inv_image + '"' + 'alt="' + vehicle.inv_model + '"></div>'
      grid += ' </li></ul></div><div class="reviews">'
      grid += '<h3>' + vehicle.inv_make + " " +  vehicle.inv_model + ' Details </h3><ul class="review-list">'
      grid += '<li>' + '<b>Price: $</b>' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</li>'
      grid += ' <li>' + '<b>Make: </b>' + vehicle.inv_make + '</li>'
      grid += ' <li>' + '<b>Model: </b>' + vehicle.inv_model + '</li>'
      grid += ' <li>' + '<b>Year: </b>' + vehicle.inv_year + '</li>'
      grid += ' <li>' + '<b>Miles: </b>' + vehicle.inv_miles + '</li>'
      grid += ' <li>' + '<b>Color: </b>' + vehicle.inv_color+ '</li>'
      grid += ' <li>' + '<b>Description: </b>' + vehicle.inv_description + '</li>'
      grid +=  '<b><a href="/inv/order/' + vehicle.inv_id + '"><< Place Order>> </a> </b>'
     
    })
    grid += '</ul></div> </section></main>'
 
  } 
  
  
  
  else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}



/* *******************************************
* Build the Select Inventory Classification
* ***************************************** */

Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select class="input100" name="classification_id" id="classificationList" required> '
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}