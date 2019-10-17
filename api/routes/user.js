const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userController= require('../controllers/user');

router.post("/signup",userController.signUP);

router.post("/login",userController.LOGINuser);

router.delete("/:userId",userController.deleteUser );

module.exports = router;

