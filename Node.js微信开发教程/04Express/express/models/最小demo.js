// 1、引入`mongoose`模块
var mongoose = require('mongoose')
// 2、通过`mongoose.connect`连接mongodb数据库
var db = mongoose.connect('mongodb://127.0.0.1/test')
// 3、通过`mongoose.model`定义模型(model)
var Cat = mongoose.model('Cat', {
  name: String,
  color: String
})
// 4、通过`new`关键字实例化Cat模型，参数是`{ name: 'Zildjian' }`，创建kitty对象
var kitty = new Cat({
  name: 'yangke',
  color: 'pink'
})
// 5、执行`kitty.save`来保存到数据库
kitty.save(err => {
  if (err) console.log(`saved error: ${err}`);

  console.log('saved ...');
})