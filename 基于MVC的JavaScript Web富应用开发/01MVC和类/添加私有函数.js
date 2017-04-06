// var Person = function() {}

// (function() {
//   var findById = function() {
//     console.log('finded...');
//   }

//   Person.find = function(id) {
//     if (typeof id === 'integer') {
//       return findById(id);
//     }
//   }
// })();

// 定义变量的时候不要丢掉var运算符，如果丢掉就会创建全局变量。
(function(exports) {
  var foo = 'bar';

  // 将变量暴露出去
  exports.foo = foo;
})(global);
