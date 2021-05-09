const HomeModel = require("../models/home.model");
const fs = require("fs");
exports.isExist = (req, res) => {
  // 判断存储空间是否存在
  const isExist = fs.existsSync("uploadFile");
  if (!isExist) {
    // 创建目录
    fs.mkdirSync("uploadFile");
  }
  res.send({isExist});
};

exports.find = async (req, res) => {
  let User = new HomeModel();
  try {
    const results = await User.findByOnly(
      {book_id: '123455'},
      true
    );
    res.send(User.success(results[0]));
  } catch (e) {
    res.send(User.error(e));
  }
  User = null;
};

