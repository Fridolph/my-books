var mongoose = require('mongoose')

mongoose.set('debug', true)

var db = mongoose.connect("mongodb://127.0.0.1:27017/test"); 

db.connection.on("error", function (error) {  
  console.log("数据库连接失败：" + error); 
}); 

db.connection.on("open", function () {  
  console.log("数据库连接成功");
});