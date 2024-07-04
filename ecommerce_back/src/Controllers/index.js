const multer = require('multer');
const path = require('path');
const userModel = require("../Models/index");

exports.getUserData=(req, res)=>{
 userModel.getAllUser((err, user)=>{
     if(err){
        res.send(err)
     }else{
        res.json({data:user})
     }
 })
}


exports.signup = (req, res) => {
   const userData =req.body
   userModel.userSignup(userData, (err, userData) => {
       if (err) {
           res.send(err);
       } else {
           res.json({ message: 'successfully', data: userData });
       }
   });
}


exports.login = (req, res) => {
    const userData = req.body;
    userModel.userLogin(userData, (err, result) => {
        if (err) {
            res.status(401).send(err);
        } else {
            res.json({ message: 'login successfully', data: result });
        }
    });
};


exports.userUpdate = (req, res) => {
    const { userId, ...userData } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
    
    userModel.updateUser(userId, userData, (err, result) => {
      if (err) {
        if (err.code === 'ER_BAD_FIELD_ERROR') {
          res.status(400).json({ message: 'Unknown column in the field list', error: err });
        } else {
          res.status(500).json({ message: 'Internal server error', error: err });
        }
      } else {
        res.json({ message: 'User updated successfully', data:{ userId, ...userData } });
      }
    });
  };


  exports.deleteUser = (req, res) => {
    const userId = req.params.userId;
  
    userModel.deleteUser(userId, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Failed to delete user', error: err });
      } else {
        res.json({ message: 'User deleted successfully', data: result });
      }
    });
  };


// product-------------------------

exports.product = async (req, res) => {
    try {
      console.log("File:", req.file); 
      console.log("Body:", req.body); 
  
      if (!req.file) {
        return res.status(400).json({ message: 'File not uploaded' });
      }
  
      const productData = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
      //  img: `/uploads/${req.file.filename}`,
        img: req.file.filename,
        quantity: req.body.quantity,
        rating: req.body.rating,
      };
  
      userModel.addProduct(productData, (err, data) => {
        if (err) {
          return res.status(500).json({ message: 'Error adding product', error: err });
        }
        res.json({ message: 'Product created successfully', data });
      });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  };
  
  

 exports.getProduct=(req, res)=>{
    userModel.getAllProduct((err, user)=>{
        if(err){
           res.send(err)
        }else{
           res.json({data:user})
        }
    })
   }