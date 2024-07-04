require("dotenv").config();
const dbConn = require("../../dbConfig");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

exports.getAllUser = (callback) => {
  let user = "Select * From users";

  dbConn.query(user, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(res);
    }
  });
};

exports.userSignup = (userData, callback) => {
  let uuid = uuidv4();
  let cretedOn = new Date();
  const hashedPassword = bcrypt.hashSync(userData.password, 10);
  let query =
    "INSERT INTO `users`(`userId`, `username`, `password`, `email`, `phoneNumber`, `createdon`, `userType`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  dbConn.query(
    query,
    [
      uuid,
      userData.username,
      hashedPassword,
      userData.email,
      userData.phoneNumber,
      cretedOn,
      userData.userType,
    ],
    (err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    }
  );
};

exports.userLogin = (userData, callback) => {
  const { email, password } = userData;
  const query = "SELECT * FROM users WHERE email = ?";

  dbConn.query(query, [email], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length === 0) {
      return callback({ message: "User not found" });
    }
    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return callback(err);
      }
      if (!isMatch) {
        return callback({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
        expiresIn: "2h",
      });
      callback(null, { ...user, token });
    });
  });
};




exports.updateUser = (userId, updatedData, callback) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updatedData)) {
    if (key === 'password') {
      fields.push(`${key} = ?`);
      values.push(bcrypt.hashSync(value, 10));
    } else if (value) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }

  const query = `UPDATE users SET ${fields.join(', ')} WHERE userId = ?`;
  values.push(userId);

  dbConn.query(query, values, callback);
  
};




exports.deleteUser = (userId, callback) => {
  const query = 'DELETE FROM users WHERE userId = ?';
  
  dbConn.query(query, [userId], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


// product------------------------------------------


exports.addProduct = (productData, callback) => {
  let uuid = uuidv4();
  let createdOn = new Date();
  let query =
    "INSERT INTO `product`(`id`, `title`, `price`, `description`, `img`, `quantity`, `createdon`, `rating`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  dbConn.query(
    query,
    [
      uuid,
      productData.title,
      productData.price,
      productData.description,
      productData.img,
      productData.quantity,
      createdOn,
      productData.rating,
    ],
    (err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    }
  );
};

exports.getAllProduct = (callback) => {
  let user = "Select * From product";

  dbConn.query(user, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(res);
    }
  });
};