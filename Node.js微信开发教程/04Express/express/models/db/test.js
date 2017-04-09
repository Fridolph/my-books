// 1、引入`mongoose connect`
require('./connect')
// 2、引入`User` Model
var User = require('./user')
// 3、定义`user` Entity
var user = new User({
  username: 'yangke',
  password: 123123
})
// 4、对数据库进行操作
user.save((err, doc) => {
  if (err) console.log(`数据保存失败: ${err}`);

  console.log(`数据保存成功: \n${doc}`);
})