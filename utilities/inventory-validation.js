const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const validate = {}

  /*  **********************************
  *  Classification Data Validation Rules
  * ********************************* */
  validate.classificationRules = () => {
    return [
      // classification name is required and must be string
      body("classification_name")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a classification name."), // on error this message is sent.
  
      
    ]
  }





  /* ******************************
 * Check data and return errors or continue to create new classification
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/add-classification", {
        errors,
        title: "Classification",
        nav,
        classification_name,

      })
      return
    }
    next()
  }





/*  **********************************
  *  Inventory Data Validation Rules
  * ********************************* */
validate.inventoryRules = () => {
  return [
    // inventory make is required and must be string
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide an inventory make."), // on error this message is sent.


    // inventory model is required and must be string
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide an inventory model."), // on error this message is sent.



    // inventory year is required and must be string
    body("inv_year")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide an inventory year."), // on error this message is sent.



    // inventory description is required and must be string
    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide an inventory description."), // on error this message is sent.






          // inventory full image path is required and must be string
    body("inv_image")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Please provide an inventory full image path."), // on error this message is sent.



          // inventory thumbnail image path is required and must be string
          body("inv_thumbnail")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 1 })
          .withMessage("Please provide an inventory thumbnail image path."), // on error this message is sent.
      
      


          // inventory price is required and must be string
          body("inv_price")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 1 })
          .withMessage("Please provide an inventory price."), // on error this message is sent.
      
      

          // inventory miles  is required and must be string
          body("inv_miles")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 1 })
          .withMessage("Please provide an inventory miles."), // on error this message is sent.
      
      


                    // inventory color  is required and must be string
                    body("inv_color")
                    .trim()
                    .escape()
                    .notEmpty()
                    .isLength({ min: 1 })
                    .withMessage("Please provide an inventory color."), // on error this message is sent.
                
                



                    // inventory classification name  is required and must be string
                    body("classification_id")
                    .trim()
                    .escape()
                    .notEmpty()
                    .isLength({ min: 1 })
                    .withMessage("Please select the inventory classification name."), // on error this message is sent.
                
               



    
  ]
}






/*  **********************************
  *  Inventory  Order Data Validation Rules
  * ********************************* */
validate.inventoryOrderRules = () => {
  return [
    // inventory make is required and must be string
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide an inventory make."), // on error this message is sent.


    // inventory model is required and must be string
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide an inventory model."), // on error this message is sent.



          // inventory price is required and must be string
          body("inv_price")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 1 })
          .withMessage("Please provide an inventory price."), // on error this message is sent.
      



    
  ]
}






/* ******************************
* Check data and return errors or continue to create new inventory
* ***************************** */
validate.checkInventoryData = async (req, res, next) => {
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-inventory", {
      errors,
      title: "Inventory",
      nav,
      inv_make, 
      inv_model, 
      inv_year, 
      inv_description, 
      inv_image, 
      inv_thumbnail, 
      inv_price, 
      inv_miles, 
      inv_color, 
      classification_id,

    })
    return
  }
  next()
}






/* ******************************
* Check data and return errors or continue to place new order
* ***************************** */
validate.checkInventoryOrderData = async (req, res, next) => {
  const { inv_id, inv_make, inv_model, inv_price, inv_quantity, classification_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/order-inventory", {
      errors,
      title: "Inventory Order",
      nav,
      inv_id, 
      inv_make, 
      inv_model, 
      inv_price, 
      inv_quantity, 
      classification_id
    })
    return
  }
  next()
}








/* ******************************
* Check data and return errors or continue to edit inventory
* ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const { inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/edit-inventory", {
      errors,
      title: "Edit Inventory",
      nav,
      inv_id,
      inv_make, 
      inv_model, 
      inv_year, 
      inv_description, 
      inv_image, 
      inv_thumbnail, 
      inv_price, 
      inv_miles, 
      inv_color, 
      classification_id,

    })
    return
  }
  next()
}







  
  module.exports = validate