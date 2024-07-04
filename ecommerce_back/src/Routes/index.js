require('dotenv').config(); 
const userController = require("../Controllers/index");
const express = require("express");
const routes = express.Router();
const multer = require('multer');
const path = require('path');
const verifyToken = require('../../middleware')


  
  
//   var Storage2 = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads");
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + "-" + file.originalname);
//     },
//   });

//   const upload2 = multer({
//     storage: Storage2,
//   });





var Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: Storage,
});
routes.post("/createproduct", upload.single("file"), userController.product);
routes.post("/signup", userController.signup);
routes.post("/login", userController.login);
routes.get("/user", verifyToken, userController.getUserData); 
routes.post("/update", userController.userUpdate); 
routes.delete("/deleteuser/:userId", userController.deleteUser); 

// routes.post("/createproduct", userController.product); 
routes.get("/product", verifyToken, userController.getProduct); 

module.exports = routes;
