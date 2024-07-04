const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("./dbConfig");
const routs = require("./src/Routes/index");
const port = 4343;

app.use(bodyparser.json());
app.use(cors());
app.use("/api", routs);

app.get("/", (req, res) => {
  res.send("hello");
});
app.use(express.static("uploads"));

app.listen(port, (err) => {
  if (err) {
    console.log("server not connectd");
  } else {
    console.log(`server is running on ${port}`);
  }
});
