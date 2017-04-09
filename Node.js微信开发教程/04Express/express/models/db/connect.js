var mongoose = require('mongoose')

var db = mongoose.connect('mongodb://127.0.0.1/test')

db.connection.on('error', err => {
  console.log(`数据库连接失败: ${err}`);
})

db.connection.on('open', () => {
  console.log('数据库连接成功');
})