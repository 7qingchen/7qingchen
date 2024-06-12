var express = require("express");
var router = express.Router();
var { userModel } = require("../model/model");

// 添加用户
router.post("/addUser", (req, res) => {
  userModel.create(req.body);
  res.send({ code: 200, msg: "添加成功" });
});

// 获取用户
router.get("/getUser", async (req, res) => {
  let data = await userModel.find();
  res.send({ code: 200, msg: "获取成功", data });
});

// 修改
router.put("/updateUser/:id", async (req, res) => {
  await userModel.updateOne({ _id: req.params.id }, req.body);
  res.send({ code: 200, msg: "修改成功" });
});

// 删除用户
router.delete("/delUser/:id", async (req, res) => {
  await userModel.deleteOne({ _id: req.params.id });
  res.send({ code: 200, msg: "删除成功" });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
