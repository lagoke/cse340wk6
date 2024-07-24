// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

const classificationValidate = require('../utilities/inventory-validation')

const inventoryValidate = require('../utilities/inventory-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);


// Route to build inventory by details view
router.get("/detail/:inventoryId", invController.buildByDetailId);

// Route to build Manage Inventory view
//router.get("/manage", invController.buildManageInventory);
router.get("/manage", utilities.handleErrors(invController.buildManageInventory))


// Route to build the new classification view
router.get("/newclassification", utilities.handleErrors(invController.buildNewClassification))

// Get inverntory by classification
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))


// Edit/Update Inventory record though the inventory id of selected inventory
router.get("/edit/:inventoryId", utilities.handleErrors(invController.editInventoryView))

// Place order on a particular Inventory item
router.get("/order/:inventoryId", utilities.handleErrors(invController.inventoryOrderView))


router.post("/update/", invController.updateInventory)

router.post("/delete/", invController.deleteInventory)


// Delete Inventory record through the inventory id of selected inventory
router.get("/delete/:inventoryId", utilities.handleErrors(invController.deleteInventoryView))


// Process the classification data
router.post(
    "/add-classification",
    classificationValidate.classificationRules(),
    classificationValidate.checkClassificationData,
    utilities.handleErrors(invController.newClassification)
  )



// Route to build the new inventory view
router.get("/newinventory", utilities.handleErrors(invController.buildNewInventory))

// Process the inventory data
router.post(
  "/add-inventory",
  inventoryValidate.inventoryRules(),
  inventoryValidate.checkInventoryData,
  utilities.handleErrors(invController.newInventory)
)



// Process the order inventory data
router.post(
  "/order-inventory",
  inventoryValidate.inventoryOrderRules(),
  inventoryValidate.checkInventoryOrderData,
  utilities.handleErrors(invController.newOrderInventory)
)




// Process the edit inventory data
router.post(
  "/edit-inventory",
  inventoryValidate.inventoryRules(),
  inventoryValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)


// Process the delete inventory data
//router.post(
  //"/delete-confirm",
  //utilities.handleErrors(invController.deleteInventory)
//)




module.exports = router;

