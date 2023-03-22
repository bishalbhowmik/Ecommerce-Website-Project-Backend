const express = require("express");
const router = express.Router();
const {registrationValidation,loginValidation} =require("../../validation/userValidation");
const {register,login} = require("../../controller/users/userController");

router.post("/register",registrationValidation, register);
router.post("/login",loginValidation,login);

module.exports = router;