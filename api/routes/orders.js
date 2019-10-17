const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");
const OrdersController = require("../controllers/order");

// Handle incoming GET requests to /orders
router.get("/",OrdersController.orders_get_all );

router.post("/", OrdersController.orders_create_order);

router.get("/:orderId", OrdersController.orders_get_order );

router.delete("/:orderId", OrdersController.orders_delete_order);

module.exports = router;