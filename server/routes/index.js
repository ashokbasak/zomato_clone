const express = require("express");

const router = express.Router();

const restaurantController = require("../controller/restaurant");
const mealTypeController = require('../controller/mealtype');
const locationController = require("../controller/location");
const userController = require('../controller/user');
const menuItemsController = require('../controller/menuItems');
require("../db/connection");

router.post("/filter", restaurantController.filterRestaurant);
router.post('/mealtype', mealTypeController.addMealType);
router.get('/restaurant/:locId ', restaurantController.getRestaurantByLocId);
router.get('/mealtype', mealTypeController.getMealType);
router.post('/location', locationController.addLocation);
router.get('/location', locationController.getLocation);
router.get('/restaurant/:resId', restaurantController.getRestaurantDetailsById);
router.get('/menuitems/:resID', menuItemsController.getMenuItemsByResId);
router.post('/signup', userController.Sighnup);
router.post('/login', userController.userLogin);

module.exports = router;
