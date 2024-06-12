const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/test_user");

let con = mongoose.connection;

con.on("open", () => {
  console.log("数据库连接成功");
});

con.on("error", (err) => {
  console.log("数据库连接失败", err);
});

module.exports = mongoose;
