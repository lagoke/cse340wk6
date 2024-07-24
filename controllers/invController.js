const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}



/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}


module.exports = invCont

/* ***************************
 *  Build inventory by detail view
 * ************************** */
invCont.buildByDetailId = async function (req, res, next) {
  const inventoryId = req.params.inventoryId
  const data = await invModel.getInventoryByInventoryId(inventoryId)
  const grid = await utilities.buildInventoryDetailGrid(data)
  let nav = await utilities.getNav()
  const vehicle_make = data[0].inv_make
  const vehicle_model = data[0].inv_model
  res.render("./inventory/detail", {
    title: vehicle_make + " " +  vehicle_model,
    nav,
    grid,
  })
}



/* ****************************************
*  Deliver Manage Inventory view
* *************************************** */
//async function buildManageInventory(req, res, next) {

  invCont.buildManageInventory = async function (req, res, next) {
  let nav = await utilities.getNav()

  const classificationSelect = await utilities.buildClassificationList()

  res.render("inventory/management", {
    title: "Manage Inventory",
    nav,
    classificationSelect,
    errors: null,
  })
}



/* ****************************************
*  Deliver Create new Classification view
* *************************************** */
invCont.buildNewClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}




/* ****************************************
*  Deliver Create new Inventory view
* *************************************** */
invCont.buildNewInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let select_classification = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add New Inventory",
    nav,
    select_classification,
    errors: null,
  })
}


/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.editInventoryView = async function (req, res, next) {
  const inventoryId = parseInt(req.params.inventoryId)
  //const inventoryId = req.params.inventoryId
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryByInventoryId(inventoryId)
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData[0].inv_id,
    inv_make: itemData[0].inv_make,
    inv_model: itemData[0].inv_model,
    inv_year: itemData[0].inv_year,
    inv_description: itemData[0].inv_description,
    inv_image: itemData[0].inv_image,
    inv_thumbnail: itemData[0].inv_thumbnail,
    inv_price: itemData[0].inv_price,
    inv_miles: itemData[0].inv_miles,
    inv_color: itemData[0].inv_color,
    classification_id: itemData[0].classification_id
  })
}








/* ***************************
 *  Build Order inventory view
 * ************************** */
invCont.inventoryOrderView = async function (req, res, next) {
  const inventoryId = parseInt(req.params.inventoryId)
  //const inventoryId = req.params.inventoryId
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryByInventoryId(inventoryId)
  //const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
  res.render("./inventory/order-inventory", {
    title: "Place Order For " + itemName,
    nav,
    errors: null,
    inv_id: itemData[0].inv_id,
    inv_make: itemData[0].inv_make,
    inv_model: itemData[0].inv_model,
    inv_price: itemData[0].inv_price,
    classification_id: itemData[0].classification_id
  })
}






/* ***************************
 *  Build delete inventory view
 * ************************** */
invCont.deleteInventoryView = async function (req, res, next) {
  const inventoryId = parseInt(req.params.inventoryId)
  //const inventoryId = req.params.inventoryId
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryByInventoryId(inventoryId)
  //const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
  res.render("./inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id: itemData[0].inv_id,
    inv_make: itemData[0].inv_make,
    inv_model: itemData[0].inv_model,
    inv_year: itemData[0].inv_year,
    inv_price: itemData[0].inv_price,
  })
}









/* ****************************************
*  Process New Classification
* *************************************** */
invCont.newClassification = async function(req, res) {
  let nav = await utilities.getNav()
  const { classification_name} = req.body

  const classificationResult = await invModel.createNewClassification(
    classification_name

  )

  if (classificationResult) {
    req.flash(
      "notice",
      `Congratulations, New Classification created successfully`
    )
    res.status(201).render("inventory/management", {
      title: "Manage Inventory",
      nav, 
    })
  } else {
    req.flash("notice", "Sorry, creation of new classification failed.")
    res.status(501).render("inv/add-classification", {
      title: "Add New Classification",
      nav,
    })
  }
}





/* ****************************************
*  Process New Inventory
* *************************************** */
invCont.newInventory = async function(req, res) {
  let nav = await utilities.getNav()
  const { inv_name, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id} = req.body

  const inventoryResult = await invModel.createNewInventory(
    inv_name, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color, 
    classification_id

  )

  if (inventoryResult) {
    req.flash(
      "notice",
      `Congratulations, New Inventory created successfully`
    )
    res.status(201).render("inventory/management", {
      title: "Manage Inventory",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, creation of new inventory failed.")
    res.status(501).render("inv/add-inventory", {
      title: "Add New Inventory",
      nav,
    })
  }
}






/* ****************************************
*  Process New Order Inventory
* *************************************** */
invCont.newOrderInventory = async function(req, res) {
  let nav = await utilities.getNav()
  const { inv_id, inv_make, inv_model, inv_price, inv_quantity, classification_id} = req.body

  const inventoryResult = await invModel.createNewOrderInventory(
    inv_id,
    inv_make, 
    inv_model, 
    inv_price, 
    inv_quantity, 
    classification_id

  )

  if (inventoryResult) {
    req.flash(
      "notice",
      `Congratulations, New Inventory Order submitted successfully`
    )
    res.status(201).render("inventory/manage-order", {
      title: "Manage Inventory Order",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, Order placement failed.")
    res.status(501).render("inventory/order-inventory", {
      title: "Order new Inventory",
      nav,
      errors: null,
    })
  }
}





/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/manage")
  } else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
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
    classification_id
    })
  }
}







/* ***************************
 *  Delete Inventory Data
 * ************************** */
invCont.deleteInventory = async function (req, res, next) {
  
  let nav = await utilities.getNav()


  const inventoryId = parseInt(req.body.inventoryId)
  const deleteResult = await invModel.deleteInventoryItem(inventoryId)


  if (deleteResult) {

    req.flash("notice", `The deletion was successfully deleted.`)
    res.redirect("/inv/manage")
  } 
  
  
  else {
  

    req.flash("notice", "Sorry, the deletion failed.")
    res.redirect("/inv/delete/" + inventoryId)



   


  }
}
